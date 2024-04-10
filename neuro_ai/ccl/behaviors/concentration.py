from loguru import logger
from ccl.processing.pre_procesing import ica

from enum import Enum


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
        data = ica(mne_raw)
        return data

    def concentration_level(self, alpha_power, beta_power) -> ConcentrationLevel:
        # Calculate the average power across all channels for each epoch
        mean_alpha_power = alpha_power.mean(axis=0)
        mean_beta_power = beta_power.mean(axis=0)

        alpha_beta_ratio = mean_alpha_power / mean_beta_power
        logger.info(f"Alpha Beta Ratio: {alpha_beta_ratio}")

        for level, threshold in reversed(self.concentration_levels_threshold.items()):
            if alpha_beta_ratio >= threshold:
                return level
        return ConcentrationLevel.NONE
