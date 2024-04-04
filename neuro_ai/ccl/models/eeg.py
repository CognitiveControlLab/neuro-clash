from typing import List, Union
from pydantic import BaseModel


class AccelerometerReadingSample(BaseModel):
    x: float
    y: float
    z: float


class TelemetryReading(BaseModel):
    sequenceId: int
    batteryLevel: float
    fuelGaugeVoltage: float
    temperature: float


class AccelerometerReading(BaseModel):
    sequenceId: int
    samples: List[AccelerometerReadingSample]


class EEGReading(BaseModel):
    electrode: int
    index: int
    samples: List[float]
    timestamp: float


class TelemetryData(BaseModel):
    type: str
    data: List[TelemetryReading]


class AccelerometerData(BaseModel):
    type: str
    data: List[AccelerometerReading]


class EEGData(BaseModel):
    type: str
    data: List[EEGReading]


class InputData(BaseModel):
    data: Union[EEGData, AccelerometerData, TelemetryData]
    userId: str
    gameId: str
