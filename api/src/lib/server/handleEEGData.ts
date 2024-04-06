import type { Proxy } from './types';

function handleEEGData(props : Proxy) {
  const { payload, proxySocket } = props;

  proxySocket.emit('eegData', payload);
}

export default handleEEGData;
