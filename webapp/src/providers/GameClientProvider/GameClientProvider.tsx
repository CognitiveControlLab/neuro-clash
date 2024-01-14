import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { io } from 'socket.io-client';
import { EEGData } from '../EEGProvider/EEGProvider';

type GameClientContextProps = {
  connectionState: ConnectionState;
  sendEEGData: (data: EEGData) => void;
  progress: any;
};

enum ConnectionState {
  DISCONNECTED,
  CONNECTED,
}

const DefaultEEGContext: GameClientContextProps = {
  connectionState: ConnectionState.DISCONNECTED,
  sendEEGData: () => { throw new Error('GameClientProvider not initialized'); },
  progress: {},
};

const GameClientContext = createContext<GameClientContextProps>(
  DefaultEEGContext,
);

type GameClientProviderProps = {
  children: ReactNode;
};

const useGameClient = () => useContext(GameClientContext);

const socket = io('ws://localhost:5000', { transports: ['websocket'] });

function GameClientProvider({
  children,
}: GameClientProviderProps): JSX.Element {
  const [connectionState, setConnectionState] = useState<ConnectionState>(DefaultEEGContext.connectionState); // eslint-disable-line max-len
  const [progress, setProgress] = useState(DefaultEEGContext.progress);

  useEffect(
    () => {
      socket.on('connect', () => setConnectionState(ConnectionState.CONNECTED));
      socket.on('disconnect', () => setConnectionState(ConnectionState.DISCONNECTED));

      socket.on('connect_error', () => {
        setTimeout(() => socket.connect(), 5000);
      });

      socket.on('progress', (data) => {
        setProgress(data);
      });

      return () => {
        socket?.disconnect();
      };
    },
    [],
  );

  const sendEEGData = useCallback((data: EEGData) => {
    socket.emit('eegData', data);
  }, [socket]);

  const gameClient: GameClientContextProps = useMemo(() => ({
    connectionState,
    sendEEGData,
    progress,
  }), [connectionState, sendEEGData, progress]);

  return (
    <GameClientContext.Provider value={gameClient}>
      {children}
    </GameClientContext.Provider>
  );
}

export { useGameClient };

export default GameClientProvider;
