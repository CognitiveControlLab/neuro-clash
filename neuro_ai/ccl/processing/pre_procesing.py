from typing import List
import numpy as np
from ccl.models.eeg import EEGReading
import mne
from mne.io import RawArray

mne.utils.set_log_level("ERROR")

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


def ica(raw: mne.io.RawArray):
    # Apply ICA for artifact removal
    ica = mne.preprocessing.ICA(n_components=4, random_state=0)
    ica.fit(raw)
    raw = ica.apply(raw)

    # Normalize the data
    scaler = mne.decoding.Scaler(scalings="mean")
    raw_data = scaler.fit_transform(raw.get_data())

    # Remove the last dimension
    raw_data = np.squeeze(raw_data)

    # Convert back to RawArray
    raw_normalized = mne.io.RawArray(raw_data, raw.info)

    return raw_normalized
