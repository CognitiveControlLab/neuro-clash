import numpy as np
import mne


class DataProcessing:
    def __init__(self):

        # add wave data
        self.len_wave_hist = 1
        self.wave_data = {}
        self.wave_data["psd_power"] = {}
        self.wave_data["psd_power"]["alpha"] = []
        self.wave_data["psd_power"]["beta"] = []
        self.wave_data["psd_power"]["theta"] = []
        self.wave_data["psd_power"]["gamma"] = []

    def append_psd_power(self, a, b, t, g):
        self.wave_data["psd_power"]["alpha"].append(a)
        self.wave_data["psd_power"]["alpha"] = self.wave_data["psd_power"]["alpha"][
            -self.len_wave_hist :
        ]
        self.wave_data["psd_power"]["beta"].append(b)
        self.wave_data["psd_power"]["beta"] = self.wave_data["psd_power"]["beta"][
            -self.len_wave_hist :
        ]
        self.wave_data["psd_power"]["theta"].append(t)
        self.wave_data["psd_power"]["theta"] = self.wave_data["psd_power"]["theta"][
            -self.len_wave_hist :
        ]
        self.wave_data["psd_power"]["gamma"].append(g)
        self.wave_data["psd_power"]["gamma"] = self.wave_data["psd_power"]["gamma"][
            -self.len_wave_hist :
        ]

    def process_psd_data(self, mne_raw: mne.io.RawArray):
        psds, freqs = mne.time_frequency.psd_array_welch(
            mne_raw.get_data(), sfreq=256, fmin=1, fmax=40, n_per_seg=256
        )

        # Find indices for alpha and beta bands
        alpha_indices = np.where((freqs >= 8) & (freqs <= 12))[0]
        beta_indices = np.where((freqs >= 13) & (freqs <= 30))[0]
        theta_indices = np.where((freqs >= 4) & (freqs <= 7))[0]
        gamma_indices = np.where((freqs >= 30) & (freqs <= 40))[0]

        # Extract and average the power for alpha and beta bands
        alpha_power = psds[:, alpha_indices].mean(axis=1)
        beta_power = psds[:, beta_indices].mean(axis=1)
        theta_power = psds[:, theta_indices].mean(axis=1)
        gamma_power = psds[:, gamma_indices].mean(axis=1)

        # Append the psd_power
        self.append_psd_power(alpha_power, beta_power, theta_power, gamma_power)
