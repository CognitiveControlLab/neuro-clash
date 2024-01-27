import logging

import numpy as np
import pyqtgraph as pg

from pyqtgraph.Qt import QtCore, QtWidgets
import mne
import pdb

from brainflow.board_shim import BoardShim, BrainFlowInputParams, BoardIds


class Graph:
    def __init__(
        self,
        board_shim,
    ):
        self.board_id = board_shim.get_board_id()
        self.board_shim = board_shim
        self.exg_channels = BoardShim.get_exg_channels(self.board_id)
        self.sampling_rate = BoardShim.get_sampling_rate(self.board_id)
        self.update_speed_ms = 50
        self.window_size = 4
        self.num_points = self.window_size * self.sampling_rate

        self.app = QtWidgets.QApplication([])
        self.win = pg.GraphicsLayoutWidget(title="BrainFlow Plot", size=(800, 600))
        self.win.show()
        self._init_timeseries()

        # Creating MNE objects from brainflow data arrays
        ch_types = ["eeg", "eeg", "eeg", "eeg"]
        ch_names = ["TP9", "AF7", "AF8", "TP10"]

        self.info = mne.create_info(
            ch_names=ch_names, sfreq=self.sampling_rate, ch_types=ch_types
        )
        timer = QtCore.QTimer()
        timer.timeout.connect(self.data_processing)
        timer.start(self.update_speed_ms)
        self.app.instance().exec_()

    def _init_timeseries(self):
        self.plots = list()
        self.curves = list()
        # for i in range(len(self.exg_channels)):
        p = self.win.addPlot(row=0, col=0)
        p.showAxis("left", False)
        p.setMenuEnabled("left", False)
        p.showAxis("bottom", False)
        p.setMenuEnabled("bottom", False)
        # if i == 0:
        p.setTitle("TimeSeries Plot")
        self.curves.extend([p.plot() for _ in range(len(self.exg_channels))])

    def set_data():
        pass

    def setup_mne_data(self, data):
        eeg_data = data[self.exg_channels, :]

        eeg_data = eeg_data / 1000000  # BrainFlow returns uV, convert to V for MNE

        raw = mne.io.RawArray(eeg_data, self.info)
        # Add a montage (only necessary for plotting)
        montage = mne.channels.make_standard_montage("standard_1020")
        raw.set_montage(montage)

        return raw

    def filter_data(self, raw):
        # Apply band-pass filter
        raw.filter(4, 40, method="iir")
        # Apply ICA for artifact removal
        ica = mne.preprocessing.ICA(n_components=4, random_state=0)
        ica.fit(raw)
        raw = ica.apply(raw)
        raw_normalized = (raw - np.mean(raw)) / np.std(raw)
        return raw_normalized

    def data_processing(self):
        data = self.board_shim.get_current_board_data(self.num_points)
        raw = self.setup_mne_data(data)

        psds, freqs = mne.time_frequency.psd_array_welch(
            raw.get_data(), self.sampling_rate, fmin=4, fmax=30, n_per_seg=256
        )

        alpha_indices = np.where((freqs >= 8) & (freqs <= 12))[0]
        beta_indices = np.where((freqs >= 13) & (freqs <= 30))[0]

        # Extract and average the power for alpha and beta bands
        alpha_power = psds[:, alpha_indices].mean(axis=1)
        beta_power = psds[:, beta_indices].mean(axis=1)

        # Calculate the average power across all channels for each epoch
        mean_alpha_power = alpha_power.mean(axis=0)
        mean_beta_power = beta_power.mean(axis=0)

        print(mean_alpha_power, mean_beta_power)

        # self.curves[0].setData(mean_alpha_power)
        self.app.processEvents()


def main():
    BoardShim.enable_dev_board_logger()
    logging.basicConfig(level=logging.DEBUG)

    params = BrainFlowInputParams()

    board_shim = BoardShim(BoardIds.MUSE_2_BOARD, params)
    try:
        board_shim.prepare_session()
        board_shim.start_stream(450000)

        Graph(board_shim)

    except BaseException:
        logging.warning("Exception", exc_info=True)
    finally:
        logging.info("End")
        if board_shim.is_prepared():
            logging.info("Releasing session")
            board_shim.release_session()


if __name__ == "__main__":
    main()
