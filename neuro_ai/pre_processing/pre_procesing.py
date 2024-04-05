from loguru import logger

import numpy as np

import mne

CH_NAMES = ["TP9", "AF7", "AF8", "TP10"]
CH_TYPES = ["eeg"] * len(CH_NAMES)
SAMPLING_RATE = 256
# Create an MNE Info object (replace 256 with the actual sampling frequency)
mne_info = mne.create_info(ch_names=CH_NAMES, sfreq=SAMPLING_RATE, ch_types=CH_TYPES)


def setup_mne_data(data):
    # eeg_data = data[exg_channels, :]

    raw = mne.io.RawArray(data, mne_info)
    montage = mne.channels.make_standard_montage("standard_1020")
    raw.set_montage(montage)

    return raw


def ica(raw):
    # Apply ICA for artifact removal
    ica = mne.preprocessing.ICA(n_components=4, random_state=0)
    ica.fit(raw)
    raw = ica.apply(raw)
    raw_normalized = (raw - np.mean(raw)) / np.std(raw)
    return raw_normalized
