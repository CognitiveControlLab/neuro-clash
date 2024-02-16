# Use the official Python base image
FROM python:3.11-slim

ENV POETRY_VERSION="1.7.1"

# Install system dependencies
RUN apt-get update --fix-missing \
    && apt-get install -y curl \
    unzip \
    make \
    gcc \
    && apt-get autoremove -y

# Install Poetry
RUN pip install poetry==${POETRY_VERSION}

# Set the working directory inside the container
WORKDIR /app

# Copy the poetry.lock and pyproject.toml files separately
# This allows Docker to cache the dependencies installation step
COPY poetry.lock pyproject.toml ./

# Install the Python dependencies
RUN poetry config installer.max-workers 10
RUN poetry install --no-root --no-cache
RUN poetry export --without dev -o requirements.txt --without-hashes
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code to the working directory
COPY . .

# Expose the port on which the application will run
EXPOSE 9090

# Run the FastAPI application using uvicorn server
CMD ["uvicorn", "neuro_ai:app", "--host", "0.0.0.0", "--port", "9090"]