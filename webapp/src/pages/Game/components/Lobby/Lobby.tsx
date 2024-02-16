import { Button, Dialog, IconButton } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { CopyAll, Settings } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useGameClient } from '../../../../providers/GameClientProvider';
import UserInfo from '../../../../types/UserInfo';
import { Player, Container, Footer } from './styles';
import EEGSetup from '../../../../components/EEGSetup';
import { ConnectionStatus, useEEG } from '../../../../providers/EEGProvider';

function Lobby() {
  const {
    users,
    toggleReady,
    userId,
  } = useGameClient();

  const { deviceInfo } = useEEG();

  const me = users.find((user : UserInfo) => user.id === userId);

  const [eegSetupOpen, setEEGSetupOpen] = useState(false);

  const onEEGSetupClose = () => {
    setEEGSetupOpen(false);
  };

  const onEEGSetupOpen = () => {
    setEEGSetupOpen(true);
  };

  const onReady = () => {
    if (deviceInfo.status === 'DISCONNECTED') {
      setEEGSetupOpen(true);
      return;
    }
    toggleReady();
  };

  useEffect(() => {
    if (deviceInfo.status === ConnectionStatus.DISCONNECTED && me?.ready) {
      toggleReady();
    }
  }, [toggleReady, deviceInfo.status, me?.ready]);

  const onCopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Dialog open fullWidth>
      <EEGSetup open={eegSetupOpen} onClose={() => onEEGSetupClose()} />
      <Container>
        {users.map((user : UserInfo) => (
          <Player key={user.id}>
            <h1>{user.id}</h1>
            <h1>{user.ready ? <FormattedMessage id="lobby.ready" /> : <FormattedMessage id="lobby.not_ready" /> }</h1>
          </Player>
        ))}
        {users.length < 2 && (
          <Player>
            <h1><FormattedMessage id="lobby.waiting_for_players" /></h1>
          </Player>
        )}

        {/* If me does not exist it's because you are a spectator */}
        {me && (
          <Footer>
            <Button variant="contained" color="primary" onClick={onReady}>
              {me?.ready ? <FormattedMessage id="lobby.not_ready" /> : <FormattedMessage id="lobby.ready" /> }
            </Button>
            <IconButton color="primary" onClick={onEEGSetupOpen}>
              <Settings />
            </IconButton>
            <IconButton color="primary" onClick={onCopyToClipboard}>
              <CopyAll />
            </IconButton>
          </Footer>
        )}
      </Container>
    </Dialog>
  );
}

export default Lobby;
