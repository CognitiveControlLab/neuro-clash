from loguru import logger
from typing import List
import numpy as np
from ccl.models.eeg import EEGReading
import mne
from mne.io import RawArray

CH_NAMES = ["TP9", "AF7", "AF8", "TP10"]
CH_TYPES = ["eeg"] * len(CH_NAMES)
SAMPLING_RATE = 256
# Create an MNE Info object (replace 256 with the actual sampling frequency)
mne_info = mne.create_info(ch_names=CH_NAMES, sfreq=SAMPLING_RATE, ch_types=CH_TYPES)


def format_input_data(input_data: List[EEGReading]) -> np.ndarray:
    channels_data = []
    for reading in sorted(input_data, key=lambda x: x.electrode):
        channels_data.append(reading.samples)
    return np.array(channels_data)


def setup_mne_data(input_data: List[EEGReading]) -> RawArray:
    data = format_input_data(input_data)
    raw = RawArray(data, mne_info)
    montage = mne.channels.make_standard_montage("standard_1020")
    raw.set_montage(montage)

    return raw


def ica(raw):
    # Apply ICA for artifact removal
    ica = mne.preprocessing.ICA(n_components=4, random_state=0)
    ica.fit(raw, verbose=False)
    raw = ica.apply(raw, verbose=False)
    raw_normalized = (raw - np.mean(raw)) / np.std(raw)
    return raw_normalized
