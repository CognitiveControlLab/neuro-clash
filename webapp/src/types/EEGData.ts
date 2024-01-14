import { AccelerometerData, EEGReading, TelemetryData } from 'muse-js';

export enum EEGDataType {
  EEG = 'eeg',
  TELEMETRY = 'telemetry',
  ACCELEROMETER = 'accelerometer',
}

export type EEGData = {
  type: EEGDataType.EEG,
  data: EEGReading,
} | {
  type: EEGDataType.TELEMETRY,
  data: TelemetryData,
} | {
  type: EEGDataType.ACCELEROMETER,
  data: AccelerometerData,
};
