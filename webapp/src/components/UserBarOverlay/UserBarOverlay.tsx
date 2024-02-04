import { ReactNode, useState } from 'react';
import { IconButton } from '@mui/material';
import { Settings } from '@mui/icons-material';
import EEGSetup from '../EEGSetup';
import { Bar, Overlay, Row } from './styles';
import { useGameClient } from '../../providers/GameClientProvider';

interface UserBarOverlayProps {
  children: ReactNode;
}

function UserBarOverlay(props: Readonly<UserBarOverlayProps>) {
  const { children } = props;
  const { userId } = useGameClient();

  const [eegSetupOpen, setEEGSetupOpen] = useState(false);

  const onEEGSetupClose = () => {
    setEEGSetupOpen(false);
  };

  const onEEGSetupOpen = () => {
    setEEGSetupOpen(true);
  };

  return (
    <div>
      <EEGSetup open={eegSetupOpen} onClose={() => onEEGSetupClose()} />
      <Overlay>
        <Row>
          <Bar>
            <h2>{userId}</h2>
            <IconButton color="primary" onClick={onEEGSetupOpen}>
              <Settings />
            </IconButton>
          </Bar>
        </Row>
      </Overlay>
      {children}
    </div>
  );
}

export default UserBarOverlay;
