import numpy as np
import mne


class DataProcessing:
    def __init__(self):

        # add wave data
        self.len_wave_hist = 10
        self.wave_data = {}
        self.wave_data["psd_power_avg"] = {}
        self.wave_data["psd_power_avg"]["alpha"] = np.array([])
        self.wave_data["psd_power_avg"]["beta"] = np.array([])
        self.wave_data["psd_power_avg"]["theta"] = np.array([])
        self.wave_data["psd_power_avg"]["gamma"] = np.array([])

    def append_psd_power_avg(self, a, b, t, g):
        # 🤢🤢: Let's improve later 😄
        self.wave_data["psd_power_avg"]["alpha"] = np.append(
            self.wave_data["psd_power_avg"]["alpha"], a
        )
        self.wave_data["psd_power_avg"]["alpha"] = self.wave_data["psd_power_avg"][
            "alpha"
        ][-self.len_wave_hist :]
        self.wave_data["psd_power_avg"]["beta"] = np.append(
            self.wave_data["psd_power_avg"]["beta"], b
        )
        self.wave_data["psd_power_avg"]["beta"] = self.wave_data["psd_power_avg"][
            "beta"
        ][-self.len_wave_hist :]
        self.wave_data["psd_power_avg"]["theta"] = np.append(
            self.wave_data["psd_power_avg"]["theta"], t
        )
        self.wave_data["psd_power_avg"]["theta"] = self.wave_data["psd_power_avg"][
            "theta"
        ][-self.len_wave_hist :]
        self.wave_data["psd_power_avg"]["gamma"] = np.append(
            self.wave_data["psd_power_avg"]["gamma"], g
        )
        self.wave_data["psd_power_avg"]["gamma"] = self.wave_data["psd_power_avg"][
            "gamma"
        ][-self.len_wave_hist :]

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

        # Append the psd_power_avg
        self.append_psd_power_avg(
            a=alpha_power.mean(axis=0),
            b=beta_power.mean(axis=0),
            t=theta_power.mean(axis=0),
            g=gamma_power.mean(axis=0),
        )
