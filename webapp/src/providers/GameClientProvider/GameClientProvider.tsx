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
import GameStatus from '../../types/GameStatus';
import UserInfo from '../../types/UserInfo';

enum ConnectionState {
  DISCONNECTED,
  CONNECTED,
}

type GameClientContextProps = {
  // Connection state of the socket
  connectionState: ConnectionState;
  // Send EEG data to the server
  sendEEGData: (data: EEGData) => void;
  // Progress of the game
  progress: any;
  // Users in the game
  users: Array<UserInfo>;
  // Join a game
  join: (gameId: string) => void;
  // User id of the current player
  userId: string;
  // Status of the game
  status: GameStatus;
  // Toggle ready status
  toggleReady: () => void;
};

const DefaultEEGContext: GameClientContextProps = {
  connectionState: ConnectionState.DISCONNECTED,
  sendEEGData: () => { throw new Error('GameClientProvider not initialized'); },
  join: () => { throw new Error('GameClientProvider not initialized'); },
  progress: {},
  status: GameStatus.WAITING,
  userId: `Player#${uuidv4().slice(0, 5)}`,
  users: [],
  toggleReady: () => { throw new Error('GameClientProvider not initialized'); },
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
  const [users, setUsers] = useState(DefaultEEGContext.users);
  const [status, setStatus] = useState(DefaultEEGContext.status);
  const [gameId, setGameId] = useState('');

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

      socket.on('users', (data: any) => {
        console.log('users data', data);
        if (data) {
          setUsers(data);
        }
      });

      socket.on('status', (data : GameStatus) => {
        if (data) {
          setStatus(data);
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

  const sendEEGData = useCallback((data: EEGData) => {
    if (!gameId) {
      throw new Error('Game id not set');
    }

    socket.emit('eegData', {
      data,
      userId: DefaultEEGContext.userId,
      gameId,
    });
  }, [gameId]);

  const join = useCallback((newGameId: string) => {
    setGameId(newGameId);
    socket.emit('join', {
      userId: DefaultEEGContext.userId,
      gameId: newGameId,
    });
  }, []);

  const toggleReady = useCallback(() => {
    if (!gameId) {
      throw new Error('Game id not set');
    }

    socket.emit('toggleReady', {
      userId: DefaultEEGContext.userId,
      gameId,
    });
  }, [gameId]);

  const gameClient: GameClientContextProps = useMemo(() => ({
    connectionState,
    sendEEGData,
    toggleReady,
    progress,
    join,
    userId: DefaultEEGContext.userId,
    users,
    status,
  }), [join, connectionState, sendEEGData, toggleReady, progress, users, status]);

  return (
    <GameClientContext.Provider value={gameClient}>
      {children}
    </GameClientContext.Provider>
  );
}

export { useGameClient, ConnectionState };

export default GameClientProvider;
