# neuro-clash AI project

## Backend API


## Setup
*Note: Make sure you have `make` installed*

To get ready with the initial setup, run
- `make initial-setup`
- `pyenv shell $(pyenv local)`
- `poetry env use $(pyenv local)`
- `make init-dev`

### Experiment Setup
Install dev dependencies
- `make init-dev`
- Install [liblsl](https://github.com/sccn/liblsl/releases)

### EEG tests
*Note: Make sure you have [Petal Metrics](https://petal.tech/downloads) installed*

View EEG
- `poetry run muselsl view`
Record EEG
- `poetry run muselsl record --duration 60`
