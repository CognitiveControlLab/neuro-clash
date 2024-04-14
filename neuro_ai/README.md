# neuro-clash AI project

## Backend API


## Setup
*Note: Make sure you have `make` installed*

To get ready with the initial setup, run
- `make initial-setup`
- `pyenv shell $(pyenv local)`
- `poetry env use $(pyenv local)`
- `make init`

### Experiment Setup
Install dependencies
- `make init`
- Install [liblsl](https://github.com/sccn/liblsl/releases)

### EEG local live testing
`make run-local`

Simple View EEG
- `poetry run muselsl view`
Record EEG Sample
- `poetry run muselsl record --duration 60`
