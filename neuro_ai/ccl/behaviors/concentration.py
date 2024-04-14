from loguru import logger
from ccl.processing.pre_procesing import ica

from enum import Enum


class ConcentrationLevel(Enum):
    NONE = 0
    LOW = 0
    MEDIUM = 1
    HIGH = 2
    REALLY_HIGH = 3


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

    def concentration_level(
        self, mean_alpha_power, mean_beta_power
    ) -> ConcentrationLevel:

        beta_alpha_ratio = mean_beta_power / mean_alpha_power
        logger.info(f"Beta Alpha Ratio: {beta_alpha_ratio}")

        for level, threshold in reversed(self.concentration_levels_threshold.items()):
            if beta_alpha_ratio >= threshold:
                return level
        return ConcentrationLevel.NONE
