
import argparse
import logging

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
            p.showAxis("left", False)
            p.setMenuEnabled("left", False)
            p.showAxis("bottom", False)
            p.setMenuEnabled("bottom", False)

            self.plots.append(p)
            curve = p.plot(pen=self.chanel_color[i], name=self.exg_channels_names[i])
            self.curves.append(curve)

    def update(self, data):
        #data = self.board_shim.get_current_board_data(self.num_points)
        for count, channel in enumerate([0,1]):
            # plot timeseries
            self.curves[count].setData(data[channel].tolist())

        self.app.processEvents()



def process_data(board_shim, graphs=None):

    #Get latest data
    data = board_shim.get_current_board_data(1000)
    #plot data
    test = i
    graphs.graphs['Test1'].update(data)
    graphs.graphs['Test2'].update(data)

  




def main():
    update_speed_ms = 50
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
        graphs.add_graph([1,4], 'Test1', True)
        graphs.add_graph([2,3], 'Test2')
        # graphs.add_graph(['F1', 'F2'], 'Test1', True)
        # graphs.add_graph(['T1', 'T2'], 'Test2')

        #Init the timer
        timer = QtCore.QTimer()
        #process_data is the fct that will be called by the API instead
        timer.timeout.connect(lambda:process_data(board_shim, graphs))
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