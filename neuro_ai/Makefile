SHELL := /usr/bin/env bash

install-poetry:
	pip install poetry

install-pyenv:
	curl https://pyenv.run | bash

install-python:
	pyenv install 3.11

init:
	poetry shell
	poerty install


# Initial setup needed for the project
initial-setup:
	make install-poetry
	make install-pyenv
	make install-python

