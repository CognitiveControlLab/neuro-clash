SHELL := /usr/bin/env bash

format:
	poetry run ruff format
	poetry run isort .

# Initial setup needed for the project
initial-setup:
	make install-pyenv
	make install-python
	make install-poetry

install-poetry:
	pip install poetry

install-pyenv:
	curl https://pyenv.run | bash

install-python:
	pyenv install 3.11

run-api:
	poetry run uvicorn neuro_ai:app --reload --port 9090

run-local:
	poetry run python local.py

init:
	poetry shell
	poetry install

lint:
	poetry run ruff check
	poetry run isort --check-only .