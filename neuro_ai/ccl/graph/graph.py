import pyqtgraph as pg
from brainflow.board_shim import BoardShim
from pyqtgraph.Qt import QtWidgets


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
        self.exg_channels = chanel_names  # Get wanted chanel
        self.exg_channels_names = chanel_names
        self.chanel_color = ["r", "b", "g", "w", "y", "p"]  # add colour
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
            # p.setYRange(1, 20, padding=0)

            self.plots.append(p)
            curve = p.plot(pen=self.chanel_color[i], name=self.exg_channels_names[i])
            self.curves.append(curve)

    def update(self, data):
        # data = self.board_shim.get_current_board_data(self.num_points)
        for i, channel in enumerate(self.exg_channels_names):
            # plot timeseries
            self.curves[i].setData(data[i])

        self.app.processEvents()