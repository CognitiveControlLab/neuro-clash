from fastapi import FastAPI
import socketio
from loguru import logger
from ccl.behaviors.concentration import Concentration
from ccl.models.eeg import InputData

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


@sio.event(namespace=namespace)
async def connect(sid, environ):
    logger.info(f"Client connected: {sid}")


@sio.event(namespace=namespace)
async def disconnect(sid):
    logger.info(f"Client disconnected: {sid}")


@sio.event(namespace=namespace)
async def eegData(sid, data: dict):
    """Structure of the data:
    {
        "data": {
            "type": "eeg",
            "data": [
                {
                    "electrode": 0,
                    "index": 2299,
                    "samples": [
                        47.36328125,
                        -178.7109375,
                        -0.9765625,
                        66.40625,
                        59.5703125,
                        -150.87890625,
                        -264.6484375,
                        -88.8671875,
                        -236.328125,
                        -729.4921875,
                        -186.03515625,
                        -187.5
                    ],
                    "timestamp": 1712191481299.75
                },...
            ]
        },
        "userId": "Player#8c98b",
        "gameId": "f6d47778-e3e4-4230-b854-85b0ad20b7a6"
    """
    # logger.info(f"Received data: {data}")
    input_data = InputData(**data)
    if not input_data.data.type == "eeg":
        # logger.error("Invalid data type")
        return

    processed_data = concentration.pre_process_data(input_data.data.data)  # DATAAAAAAAA
    concentration_level = concentration.concentration_level(processed_data)

    logger.info(f"Concentration Level: {concentration_level.value}")

    await sio.emit(
        "progress",
        data={"concentration_level": concentration_level.value},
        to=sid,
        namespace=namespace,
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=9090)
