import {
  AccelerometerData,
  EEGReading,
  MuseClient,
  TelemetryData,
} from 'muse-js';
import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

enum ConnectionStatus {
  DISCONNECTED,
  CONNECTING,
  CONNECTED,
}

type EEGData = EEGReading | AccelerometerData | TelemetryData;

type EEGManagerProps = {
  setListener: (listener: (reading: EEGData) => void) => void;
  connect: () => Promise<void>;
  disconnect: () => void;
  deviceInfo: EEGDeviceInfo;
};

type EEGDeviceInfo = {
  name: string | null;
  status: ConnectionStatus;
};

const DefaultEEGContext: EEGManagerProps = {
  setListener: () => { throw new Error('EEGProvider not initialized'); },
  connect: () => { throw new Error('EEGProvider not initialized'); },
  disconnect: () => { throw new Error('EEGProvider not initialized'); },
  deviceInfo: {
    name: null,
    status: ConnectionStatus.DISCONNECTED,
  },
};

const EEGContext = createContext<EEGManagerProps>(
  DefaultEEGContext,
);

type EEGProviderProps = {
  children: ReactNode;
};

const muse = new MuseClient();

const useEEG = () => useContext(EEGContext);

function EEGProvider({
  children,
}: EEGProviderProps): JSX.Element {
  const [deviceInfo, setDeviceInfo] = useState(DefaultEEGContext.deviceInfo);
  const eegListenerRef = useRef<(reading: EEGData) => void>();

  const eegListener = (reading: EEGData) => {
    if (eegListenerRef.current) {
      eegListenerRef.current(reading);
    }
  };

  const setListener = (listener: (reading: EEGData) => void) => {
    eegListenerRef.current = listener;
  };

  const connect = async () => {
    try {
      setDeviceInfo(() => ({
        name: null,
        status: ConnectionStatus.CONNECTING,
      }));

      await muse.connect();
      await muse.start();

      setDeviceInfo(() => ({
        name: muse.deviceName,
        status: muse.connectionStatus ? ConnectionStatus.CONNECTED : ConnectionStatus.DISCONNECTED,
      }));

      muse.connectionStatus.subscribe((newStatus : boolean) => {
        setDeviceInfo(() => ({
          name: newStatus ? muse.deviceName : null,
          status: newStatus ? ConnectionStatus.CONNECTED : ConnectionStatus.DISCONNECTED,
        }));
      });

      muse.eegReadings.subscribe(eegListener);
      muse.telemetryData.subscribe(eegListener);
      muse.accelerometerData.subscribe(eegListener);
    } catch (e) {
      setDeviceInfo(() => ({
        name: null,
        status: ConnectionStatus.DISCONNECTED,
      }));
    }
  };

  const disconnect = () => {
    muse.disconnect();
  };

  const eegContextState: EEGManagerProps = useMemo(() => ({
    setListener,
    connect,
    disconnect,
    deviceInfo,
  }), [deviceInfo]);

  return (
    <EEGContext.Provider value={eegContextState}>
      {children}
    </EEGContext.Provider>
  );
}

export type { EEGManagerProps };

export { useEEG, ConnectionStatus };

export default EEGProvider;
