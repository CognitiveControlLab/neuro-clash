import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { EEGData } from '../EEGProvider/EEGProvider';
import socket from './socket';

type GameClientContextProps = {
  connectionState: ConnectionState;
  sendEEGData: (userId: string, gameId: string, data: EEGData) => void;
  progress: any;
  join: (userId: string, gameId: string) => void;
};

enum ConnectionState {
  DISCONNECTED,
  CONNECTED,
}

const DefaultEEGContext: GameClientContextProps = {
  connectionState: ConnectionState.DISCONNECTED,
  sendEEGData: () => { throw new Error('GameClientProvider not initialized'); },
  join: () => { throw new Error('GameClientProvider not initialized'); },
  progress: {},
};

const GameClientContext = createContext<GameClientContextProps>(
  DefaultEEGContext,
);

type GameClientProviderProps = {
  children: ReactNode;
};

const useGameClient = () => useContext(GameClientContext);

function GameClientProvider({
  children,
}: GameClientProviderProps): JSX.Element {
  const [connectionState, setConnectionState] = useState<ConnectionState>(
    ConnectionState.DISCONNECTED,
  );
  const [progress, setProgress] = useState(DefaultEEGContext.progress);

  useEffect(
    () => {
      socket.on('connect', () => setConnectionState(ConnectionState.CONNECTED));
      socket.on('disconnect', () => setConnectionState(ConnectionState.DISCONNECTED));
      socket.on('connect_error', () => {
        setTimeout(() => socket.connect(), 5000);
      });

      socket.on('progress', (data) => {
        if (data) {
          setProgress(data);
        }
      });

      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('connect_error');
        socket.off('progress');
      };
    },
    [],
  );

  const sendEEGData = useCallback((userId: string, gameId: string, data: EEGData) => {
    socket.emit('eegData', { data, userId, gameId });
  }, []);

  const join = useCallback((userId: string, gameId: string) => {
    socket.emit('join', { userId, gameId });
  }, []);

  const gameClient: GameClientContextProps = useMemo(() => ({
    connectionState,
    sendEEGData,
    progress,
    join,
  }), [join, connectionState, sendEEGData, progress]);

  return (
    <GameClientContext.Provider value={gameClient}>
      {children}
    </GameClientContext.Provider>
  );
}

export { useGameClient, ConnectionState };

export default GameClientProvider;
