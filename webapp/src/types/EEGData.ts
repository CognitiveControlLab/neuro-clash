import { AccelerometerData, EEGReading, TelemetryData } from 'muse-js';

export enum EEGDataType {
  MOCK_EEG = 'mock_eeg',
  EEG = 'eeg',
  TELEMETRY = 'telemetry',
  ACCELEROMETER = 'accelerometer',
}

export type EEGData = {
  type: EEGDataType.MOCK_EEG,
  data: Array<EEGReading>,
} | {
  type: EEGDataType.EEG,
  data: Array<EEGReading>,
} | {
  type: EEGDataType.TELEMETRY,
  data: TelemetryData,
} | {
  type: EEGDataType.ACCELEROMETER,
  data: AccelerometerData,
};
