import logging
import numpy as np
from brainflow.board_shim import BoardShim, BrainFlowInputParams, BoardIds
from pyqtgraph.Qt import QtCore, QtWidgets
import mne
from ccl.graph.graph import GraphManager

def setup_local(data_processor):
    update_speed_ms = 1000
    BoardShim.enable_dev_board_logger()
    logging.basicConfig(level=logging.DEBUG)

    params = BrainFlowInputParams()
    board_shim = BoardShim(BoardIds.MUSE_2_BOARD, params)

    graphs = GraphManager(board_shim)

    try:
        board_shim.prepare_session()
        board_shim.start_stream(450000)
        # Add graph
        #graphs.add_graph(["Alpha", "Beta"], "Test1", True)
        #graphs.add_graph(["Alpha", "Beta"], "Test2")

        # Init the timer
        timer = QtCore.QTimer()
        # process_data is the fct that will be called by the API instead
        timer.timeout.connect(lambda: data_processor.process_psd_data(board_shim, graphs))
        timer.start(update_speed_ms)
        QtWidgets.QApplication.instance().exec_()

    except BaseException:
        logging.warning("Exception", exc_info=True)
    finally:
        logging.info("End")
        if board_shim.is_prepared():
            logging.info("Releasing session")
            board_shim.release_session()
