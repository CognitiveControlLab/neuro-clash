import {
  AccelerometerData,
  EEGReading,
  MuseClient,
  TelemetryData,
} from 'muse-js';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { EEGData, EEGDataType } from '../../types/EEGData';

enum ConnectionStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
}

type EEGManagerProps = {
  setDataListener: (listener: (reading: EEGData) => void) => void;
  connect: (fake?: boolean) => Promise<void>;
  disconnect: () => void;
  deviceInfo: EEGDeviceInfo;
};

type EEGDeviceInfo = {
  name?: string;
  status: ConnectionStatus;
};

const DefaultEEGContext: EEGManagerProps = {
  setDataListener: () => { throw new Error('EEGProvider not initialized'); },
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

  const connect = useCallback(async (fake: boolean = false) => {
    if (fake) {
      setDeviceInfo(() => ({
        name: 'Fake Muse',
        status: ConnectionStatus.CONNECTED,
      }));

      setInterval(() => {
        eegListener({
          type: EEGDataType.EEG,
          data: [{
            electrode: 0,
            index: 1589,
            samples: [-355.46875,
              999.51171875,
              419.43359375,
              -1000,
              -836.9140625,
              753.90625,
              909.66796875,
              -620.60546875,
              -1000,
              34.1796875,
              999.51171875,
              18.5546875],
            timestamp: 1711301518161.5,
          }],
        });
        eegListener({
          type: EEGDataType.ACCELEROMETER,
          data: {
            sequenceId: 11662,
            samples: [{ x: Math.random(), y: Math.random(), z: Math.random() },
              { x: Math.random(), y: Math.random(), z: Math.random() },
              { x: Math.random(), y: Math.random(), z: Math.random() }],
          },
        });
        eegListener({
          type: EEGDataType.TELEMETRY,
          data: {
            sequenceId: 64, batteryLevel: 55, fuelGaugeVoltage: 3218.6000000000004, temperature: 0,
          },
        });
      }, 100);

      return;
    }

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

      let eegReadingBuffer : EEGReading[] = [];
      muse.eegReadings.subscribe((data : EEGReading) => {
        if (eegReadingBuffer.length === 0 || eegReadingBuffer[0].index === data.index) {
          eegReadingBuffer.push(data);
          return;
        }

        eegListener({
          type: EEGDataType.EEG,
          data: eegReadingBuffer.sort((a, b) => a.electrode - b.electrode),
        });

        eegReadingBuffer = [data];
      });

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
  }, []);

  const disconnect = () => {
    muse.disconnect();
  };

  const eegContextState: EEGManagerProps = useMemo(() => ({
    setDataListener,
    connect,
    disconnect,
    deviceInfo,
  }), [deviceInfo, connect]);

  return (
    <EEGContext.Provider value={eegContextState}>
      {children}
    </EEGContext.Provider>
  );
}

export type { EEGManagerProps, EEGData };

export { useEEG, ConnectionStatus };

export default EEGProvider;
