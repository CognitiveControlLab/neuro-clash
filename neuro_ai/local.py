import mne
from brainflow.board_shim import BoardShim, BrainFlowInputParams, BoardIds
from pyqtgraph.Qt import QtCore, QtWidgets
from ccl.graph.graph import GraphManager, Graph
from ccl.processing.data_processing import DataProcessing

from loguru import logger

dp = DataProcessing()


def setup_mne_data_local(data):
    eeg_data = data[[1, 2, 3, 4], :]

    # eeg_data = eeg_data / 1000000  # BrainFlow returns uV, convert to V for MNE
    info = mne.create_info(
        ch_names=["TP9", "AF7", "AF8", "TP10"],
        sfreq=256,
        ch_types=["eeg", "eeg", "eeg", "eeg"],
    )

    raw = mne.io.RawArray(eeg_data, info)
    # Add a montage (only necessary for plotting)
    montage = mne.channels.make_standard_montage("standard_1020")
    raw.set_montage(montage)

    return raw


def process_data(board_shim: BoardShim, graphs: list[Graph] = None):
    # Get latest data
    data = board_shim.get_current_board_data(256)

    # transform brainflow to mne data
    raw = setup_mne_data_local(data)

    dp.process_psd_data(raw)

    graphs.graphs["concentration"].update(
        [
            dp.wave_data["psd_power_avg"]["alpha"],
            dp.wave_data["psd_power_avg"]["beta"],
        ]
    )


if __name__ == "__main__":
    update_speed_ms = 100

    # Setup Brainflow board connection
    BoardShim.enable_dev_board_logger()
    params = BrainFlowInputParams()
    board_shim = BoardShim(BoardIds.MUSE_2_BOARD, params)

    graphs = GraphManager(board_shim)

    try:
        board_shim.prepare_session()
        board_shim.start_stream(450000)

        graphs.add_graph(
            waves=["Alpha", "Beta"], title="concentration", overlap_plot=True
        )

        # Init the timer
        timer = QtCore.QTimer()
        timer.timeout.connect(lambda: process_data(board_shim, graphs))
        timer.start(update_speed_ms)

        QtWidgets.QApplication.instance().exec_()

    except BaseException as e:
        logger.warning(f"Exception: {e}", exc_info=True)
    finally:
        logger.info("End")
        if board_shim.is_prepared():
            logger.info("Releasing session")
            board_shim.release_session()
