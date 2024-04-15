from typing import List
import pyqtgraph as pg
from brainflow.board_shim import BoardShim
from pyqtgraph.Qt import QtWidgets


class GraphManager:
    def __init__(self, board_shim: BoardShim):
        self.update_speed_ms = 50
        self.window_size = 4
        self.board_shim = board_shim
        self.size = (800, 600)
        self.graphs = {}

    def add_graph(self, waves: List[str], title: str, overlap_plot: bool = False):
        newGraph = Graph(self.board_shim, waves, title, self.size, overlap_plot)
        self.graphs[title] = newGraph


class Graph:
    def __init__(
        self,
        board_shim: BoardShim,
        wave_names: List[str],
        title: str,
        size: tuple[int, int],
        overlap_plot: bool,
    ):

        self.board_id = board_shim.get_board_id()
        self.board_shim = board_shim
        self.wave_names = wave_names
        self.wave_color = ["r", "b", "g", "w", "y", "p"]  # add colour
        self.sampling_rate = BoardShim.get_sampling_rate(self.board_id)
        self.overlap_plot = overlap_plot
        self.app = QtWidgets.QApplication([])
        self.win = pg.GraphicsLayoutWidget(title=title, size=size)
        self.win.show()

        self._init_timeseries()

    def _init_timeseries(self):
        self.plots = list()
        self.curves = list()
        # Removed the multiple plot options for simplicity
        # TODO: Add back multiple plot if necessary
        p = self.win.addPlot(row=0, col=0)

        p.addLegend()
        p.showAxis("left")
        p.setMenuEnabled("left")
        p.showAxis("bottom")
        p.setMenuEnabled("bottom")
        p.setTitle("TimeSeries Plot")

        self.plots.append(p)
        self.curves.extend(
            [
                p.plot(pen=self.wave_color[i], name=self.wave_names[i])
                for i in range(len(self.wave_names))
            ]
        )

    def update(self, data):
        for i in range(len(self.wave_names)):
            # plot timeseries
            self.curves[i].setData(data[i][-50:])

        self.app.processEvents()
