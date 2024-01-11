import { Button, Container, Dialog } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { ClipLoader } from 'react-spinners';
import { ConnectionStatus, useEEG } from '../../providers/MuseProvider/EEGProvider';
import {
  EEGContainer,
  Footer,
  Header,
  DeviceName,
  Title,
  EEGConnectedIcon,
  EEGDisconnectedIcon,
} from './styles';

interface EEGSetupProps {
  open: boolean;
  onClose: () => void;
}

function EEGSetupModal(props: EEGSetupProps): JSX.Element {
  const {
    open,
    onClose,
  } = props;

  const {
    connect,
    disconnect,
    deviceInfo,
  } = useEEG();

  const handleConnectDisconnect = async () => {
    if (deviceInfo.status === ConnectionStatus.DISCONNECTED) {
      await connect();
    } else {
      disconnect();
    }
  };

  return (
    <Dialog open={open} fullWidth>
      <div>
        <Header>
          <Title>
            <FormattedMessage id="eegSetup.title" />
          </Title>
        </Header>
        <hr />
        <Container>
          <EEGContainer>
            {deviceInfo.status === ConnectionStatus.CONNECTED && (
              <EEGConnectedIcon />
            )}
            {deviceInfo.status === ConnectionStatus.CONNECTING && (
              <ClipLoader color="#000000" loading size={100} />
            )}
            {deviceInfo.status === ConnectionStatus.DISCONNECTED && (
              <EEGDisconnectedIcon />
            )}
            <DeviceName>
              { deviceInfo.status === ConnectionStatus.CONNECTED ? (
                deviceInfo.name) : (
                  <FormattedMessage id="eegSetup.noDeviceConnected" />
              )}
            </DeviceName>
            <Button disabled={deviceInfo.status === ConnectionStatus.CONNECTING} variant="outlined" onClick={handleConnectDisconnect}>
              { deviceInfo.status === ConnectionStatus.DISCONNECTED
                ? <FormattedMessage id="eegSetup.connect" />
                : <FormattedMessage id="eegSetup.disconnect" />}
            </Button>
          </EEGContainer>
          <Footer>
            <Button variant="contained" onClick={onClose}>
              <FormattedMessage id="close" />
            </Button>
          </Footer>
        </Container>
      </div>
    </Dialog>
  );
}

export default EEGSetupModal;
