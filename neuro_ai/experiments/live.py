
import argparse
import logging
import numpy as np
import pyqtgraph as pg
from brainflow.board_shim import BoardShim, BrainFlowInputParams, BoardIds
from brainflow.data_filter import DataFilter, FilterTypes, DetrendOperations
from pyqtgraph.Qt import QtGui, QtCore, QtWidgets

import time
import matplotlib

matplotlib.use('Agg')
import matplotlib.pyplot as plt
import mne


class GraphManager:
    def __init__(self, board_shim):
        self.update_speed_ms = 50
        self.window_size = 4
        self.board_shim = board_shim
        self.size = (800, 600)
        self.graphs = {}


    def add_graph(self, chanels, title, overlap_plot=False):
        newGraph = Graph(self.board_shim, chanels, title, self.size, overlap_plot)
        self.graphs[title] = newGraph


class Graph:
    def __init__(self, board_shim, chanel_names, title, size, overlap_plot):
 
        self.board_id = board_shim.get_board_id()
        self.board_shim = board_shim
        self.exg_channels = chanel_names # Get wanted chanel
        self.exg_channels_names = chanel_names
        self.chanel_color = ['r', 'b', 'g', 'w', 'y', 'p'] #add colour
        self.sampling_rate = BoardShim.get_sampling_rate(self.board_id)
        self.overlap_plot = overlap_plot
        self.app = QtWidgets.QApplication([])
        self.win = pg.GraphicsLayoutWidget(title=title, size=size)
        self.win.show()
        
        self._init_timeseries()


    def _init_timeseries(self):
        self.plots = list()
        self.curves = list()
        for i in range(len(self.exg_channels)):
            if self.overlap_plot:
                p = self.win.addPlot(row=0, col=0)
            else:
                p = self.win.addPlot(row=i, col=0)
            p.addLegend()
            p.showAxis("left", True)
            p.setMenuEnabled("left", False)
            p.showAxis("bottom", True)
            p.setMenuEnabled("bottom", False)
            p.setYRange(0, 1000, padding=0)
            #p.setYRange(1, 20, padding=0)

            self.plots.append(p)
            curve = p.plot(pen=self.chanel_color[i], name=self.exg_channels_names[i])
            self.curves.append(curve)

    def update(self, data):
        #data = self.board_shim.get_current_board_data(self.num_points)
        for i, channel in enumerate(self.exg_channels_names):
            # plot timeseries
            self.curves[i].setData(data[i])

        self.app.processEvents()


data1 = []
data2 = []
data3 = []

class DataProcessig:
    def __init__(self):

        #add wave data
        self.len_wave_hist = 10
        self.wave_data = {}
        self.wave_data['waves_avg'] = {}
        self.wave_data['waves_avg']['alpha'] = []
        self.wave_data['waves_avg']['beta'] = []
        self.wave_data['waves_avg']['theta'] = []
        self.wave_data['waves_avg']['gamma'] = []

    def append_wave_avg(self, a, b, t, g):
        self.wave_data['waves_avg']['alpha'].append(a)
        self.wave_data['waves_avg']['alpha'] = self.wave_data['waves_avg']['alpha'][-self.len_wave_hist:]
        self.wave_data['waves_avg']['beta'].append(b)
        self.wave_data['waves_avg']['beta'] = self.wave_data['waves_avg']['beta'][-self.len_wave_hist:]
        self.wave_data['waves_avg']['theta'].append(t)
        self.wave_data['waves_avg']['theta'] = self.wave_data['waves_avg']['theta'][-self.len_wave_hist:]
        self.wave_data['waves_avg']['gamma'].append(g)
        self.wave_data['waves_avg']['gamma'] = self.wave_data['waves_avg']['gamma'][-self.len_wave_hist:]

    def process_data(self, board_shim, graphs=None):
        #Get latest data
        data = board_shim.get_current_board_data(256)
        #transform brainflow to mne data
        raw = setup_mne_data(data)
        #plot data
        sfreq = raw.info["sfreq"]  # Sampling frequency

        psd, freqs = mne.time_frequency.psd_array_welch(
            raw.get_data(), sfreq, fmin=4, fmax=40, n_per_seg=256
        )

        # Find indices for alpha and beta bands
        alpha_indices = np.where((freqs >= 8) & (freqs <= 12))[0]
        beta_indices = np.where((freqs >= 13) & (freqs <= 30))[0]
        theta_indices = np.where((freqs >= 4) & (freqs <= 7))[0]
        gamma_indices = np.where((freqs >= 30) & (freqs <= 40))[0]

        # Extract and average the power for alpha and beta bands
        # alpha_power = psd[:, 0, alpha_indices]
        # beta_power = psd[:, 0, beta_indices]
        alpha_power = psd[:, alpha_indices].mean(axis=1)
        beta_power = psd[:, beta_indices].mean(axis=1)
        theta_power = psd[:, theta_indices].mean(axis=1)
        gamma_power = psd[:, gamma_indices].mean(axis=1)

        mean_alpha_power = alpha_power.mean(axis=0)
        mean_beta_power = beta_power.mean(axis=0)
        mean_theta_power = theta_power.mean(axis=0)
        mean_gamma_power = gamma_power.mean(axis=0)

        # Generate the epochs array (assuming you have the same number of epochs for both alpha and beta)
        print(mean_alpha_power)
        self.append_wave_avg(mean_alpha_power, mean_beta_power, mean_theta_power, mean_gamma_power)

        graphs.graphs['Test1'].update([self.wave_data['waves_avg']['alpha'], self.wave_data['waves_avg']['beta'], self.wave_data['waves_avg']['theta']])
        #graphs.graphs['Test2'].update([data1,data2])

def setup_mne_data(data):
    eeg_data = data[[1, 2, 3, 4], :]

    #eeg_data = eeg_data / 1000000  # BrainFlow returns uV, convert to V for MNE
    info = mne.create_info(
        ch_names=["TP9", "AF7", "AF8", "TP10"], sfreq=256, ch_types=["eeg", "eeg", "eeg", "eeg"]
    )

    raw = mne.io.RawArray(eeg_data, info)
    # Add a montage (only necessary for plotting)
    montage = mne.channels.make_standard_montage("standard_1020")
    raw.set_montage(montage)

    return raw

def main():
    update_speed_ms = 1000
    BoardShim.enable_dev_board_logger()
    logging.basicConfig(level=logging.DEBUG)

    params = BrainFlowInputParams()
    board_shim = BoardShim(BoardIds.MUSE_2_BOARD, params)

    
    graphs = GraphManager(board_shim)

    try:
        board_shim.prepare_session()
        board_shim.start_stream(450000)
        #data = board_shim.get_current_board_data(self.num_points)
        
        #Add graph
        #graphs.add_graph([1,4], 'Test1', True)
        #graphs.add_graph([2,3], 'Test2')
        graphs.add_graph(['Alpha', 'Beta', 'Teta'], 'Test1', True)
        graphs.add_graph(['Alpha', 'Beta'], 'Test2')
        dp = DataProcessig()

        #Init the timer
        timer = QtCore.QTimer()
        #process_data is the fct that will be called by the API instead
        timer.timeout.connect(lambda:dp.process_data(board_shim, graphs))
        timer.start(update_speed_ms)
        QtWidgets.QApplication.instance().exec_()

    except BaseException:
        logging.warning("Exception", exc_info=True)
    finally:
        logging.info("End")
        if board_shim.is_prepared():
            logging.info("Releasing session")
            board_shim.release_session()


if __name__ == "__main__":
    main()