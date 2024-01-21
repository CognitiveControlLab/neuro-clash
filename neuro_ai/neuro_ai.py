from fastapi import FastAPI
import socketio
from loguru import logger
from behaviors.concentration import Concentration

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
async def eegData(sid, data):
    logger.info(f"Received data: {data}")

    concentration.pre_process_data(data)
    concentration_level = concentration.concentration_level(data)

    logger.info(f"Concentration Level: {concentration_level}")

    await sio.emit("progress", data=data, to=sid, namespace=namespace)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=9090)
