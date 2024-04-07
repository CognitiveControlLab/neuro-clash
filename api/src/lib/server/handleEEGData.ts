import type { Proxy } from './types';

function handleEEGData(props : Proxy) {
  const { payload, proxySocket } = props;
  if (payload.data.type !== 'eeg') {
    return;
  }
  proxySocket.emit('eegData', payload);
}

export default handleEEGData;
