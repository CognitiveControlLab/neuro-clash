from fastapi import FastAPI
import socketio
from loguru import logger
from ccl.behaviors.concentration import Concentration
from ccl.models.eeg import InputData
from ccl.processing.data_processing import DataProcessing
from ccl.processing.pre_procesing import setup_mne_data

# Create a FastAPI app
app = FastAPI()

# Create a Socket.IO asynchronous server
sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins="*")

# Wrap FastAPI app with Socket.IO application
app = socketio.ASGIApp(sio, app)

# Example namespace
namespace = "/eeg"

# Create the behaviors objects
concentration = Concentration()

# TODO: Create data object
data_processor = DataProcessing()


@sio.event(namespace=namespace)
async def connect(sid, environ):
    logger.info(f"Client connected: {sid}")


@sio.event(namespace=namespace)
async def disconnect(sid):
    logger.info(f"Client disconnected: {sid}")


@sio.event(namespace=namespace)
async def eegData(sid, data: dict):
    input_data = InputData(**data)
    if not input_data.data.type == "eeg":
        logger.error(f"Invalid data type: {input_data.data.type}")
        return

    mne_raw = setup_mne_data(input_data.data.data)

    processed_data = concentration.pre_process_data(mne_raw)

    data_processor.process_psd_data(processed_data)

    # concentration

    concentration_level = concentration.concentration_level(
        data_processor.wave_data["psd_power_avg"]["alpha"][-1],
        data_processor.wave_data["psd_power_avg"]["beta"][-1],
    )

    logger.info(f"Concentration Level: {concentration_level.value}")

    await sio.emit(
        "progress",
        data={
            "concentration_level": concentration_level.value,
            "userId": data["userId"],
            "gameId": data["gameId"],
        },
        to=sid,
        namespace=namespace,
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=9090)
