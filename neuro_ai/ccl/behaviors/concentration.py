import numpy as np
from loguru import logger
from typing import List
from ccl.pre_processing.pre_procesing import ica, setup_mne_data
from ccl.models.eeg import EEGReading

from enum import Enum
import mne


class ConcentrationLevel(Enum):
    NONE = 0
    LOW = 1
    MEDIUM = 2
    HIGH = 3
    REALLY_HIGH = 4


class Concentration:
    def __init__(self):
        self.concentration_levels_threshold = {
            ConcentrationLevel.NONE: 0,
            ConcentrationLevel.LOW: 1,
            ConcentrationLevel.MEDIUM: 2.5,
            ConcentrationLevel.HIGH: 3,
            ConcentrationLevel.REALLY_HIGH: 4,
        }

    def pre_process_data(self, mne_raw):
        mne_raw.filter(4, 40, method="iir")
        # data = ica(mne_raw)
        return mne_raw

    def concentration_level(self, alpha_power, beta_power) -> ConcentrationLevel:
        # Calculate the average power across all channels for each epoch
        mean_alpha_power = alpha_power.mean(axis=0)
        mean_beta_power = beta_power.mean(axis=0)

        alpha_beta_ratio = mean_alpha_power / mean_beta_power

        # Determine the concentration level based on the alpha_beta_ratio threshold
        concentration_thresholds = list(self.concentration_levels_threshold.values())
        concentration_levels = list(self.concentration_levels_threshold.keys())
        concentration_level = concentration_levels[
            np.argmax(alpha_beta_ratio >= np.array(concentration_thresholds))
        ]

        return concentration_level
