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
import { EEGData, EEGDataType } from '../../types/EEGData';

enum ConnectionStatus {
  DISCONNECTED,
  CONNECTING,
  CONNECTED,
}

type EEGManagerProps = {
  setDataListener?: (listener: (reading: EEGData) => void) => void;
  connect: () => Promise<void>;
  disconnect: () => void;
  deviceInfo: EEGDeviceInfo;
};

type EEGDeviceInfo = {
  name?: string;
  status: ConnectionStatus;
};

const DefaultEEGContext: EEGManagerProps = {
  setDataListener: undefined,
  connect: () => { throw new Error('EEGProvider not initialized'); },
  disconnect: () => { throw new Error('EEGProvider not initialized'); },
  deviceInfo: {
    name: undefined,
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

  const setDataListener = (listener: (reading: EEGData) => void) => {
    eegListenerRef.current = listener;
  };

  const connect = async () => {
    try {
      setDeviceInfo(() => ({
        name: undefined,
        status: ConnectionStatus.CONNECTING,
      }));

      await muse.connect();
      await muse.start();

      setDeviceInfo(() => ({
        name: muse.deviceName || undefined,
        status: muse.connectionStatus ? ConnectionStatus.CONNECTED : ConnectionStatus.DISCONNECTED,
      }));

      muse.connectionStatus.subscribe((newStatus : boolean) => {
        setDeviceInfo(() => ({
          name: newStatus && muse.deviceName ? muse.deviceName : undefined,
          status: newStatus ? ConnectionStatus.CONNECTED : ConnectionStatus.DISCONNECTED,
        }));
      });

      muse.eegReadings.subscribe((data : EEGReading) => eegListener({
        type: EEGDataType.EEG,
        data,
      }));
      muse.telemetryData.subscribe((data : TelemetryData) => eegListener({
        type: EEGDataType.TELEMETRY,
        data,
      }));
      muse.accelerometerData.subscribe((data : AccelerometerData) => eegListener({
        type: EEGDataType.ACCELEROMETER,
        data,
      }));
    } catch (e) {
      setDeviceInfo(() => ({
        name: undefined,
        status: ConnectionStatus.DISCONNECTED,
      }));
    }
  };

  const disconnect = () => {
    muse.disconnect();
  };

  const eegContextState: EEGManagerProps = useMemo(() => ({
    setDataListener,
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

export type { EEGManagerProps, EEGData };

export { useEEG, ConnectionStatus };

export default EEGProvider;
