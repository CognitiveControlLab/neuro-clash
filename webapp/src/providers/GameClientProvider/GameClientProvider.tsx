import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EEGData } from '../EEGProvider/EEGProvider';
import socket from './socket';

type GameClientContextProps = {
  connectionState: ConnectionState;
  sendEEGData: (gameId: string, data: EEGData) => void;
  progress: any;
  join: (gameId: string) => void;
  userId: string;
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
  userId: `Player#${uuidv4().slice(0, 5)}`,
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
}: Readonly<GameClientProviderProps>): JSX.Element {
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

  const sendEEGData = useCallback((gameId: string, data: EEGData) => {
    socket.emit('eegData', {
      data,
      userId: DefaultEEGContext.userId,
      gameId,
    });
  }, []);

  const join = useCallback((gameId: string) => {
    socket.emit('join', {
      userId: DefaultEEGContext.userId,
      gameId,
    });
  }, []);

  const gameClient: GameClientContextProps = useMemo(() => ({
    connectionState,
    sendEEGData,
    progress,
    join,
    userId: DefaultEEGContext.userId,
  }), [join, connectionState, sendEEGData, progress]);

  return (
    <GameClientContext.Provider value={gameClient}>
      {children}
    </GameClientContext.Provider>
  );
}

export { useGameClient, ConnectionState };

export default GameClientProvider;
