import { ReactNode, useState } from 'react';
import { IconButton } from '@mui/material';
import { Settings, GitHub } from '@mui/icons-material';
import EEGSetup from '../EEGSetup';
import {
  Bar, GitLink, LinkWrapper, Overlay, Row,
} from './styles';
import { useGameClient } from '../../providers/GameClientProvider';

interface UserBarOverlayProps {
  children: ReactNode;
}

function UserBarOverlay(props: Readonly<UserBarOverlayProps>) {
  const { children } = props;
  const { me } = useGameClient();

  const [eegSetupOpen, setEEGSetupOpen] = useState(false);

  const onEEGSetupClose = () => {
    setEEGSetupOpen(false);
  };

  const onEEGSetupOpen = () => {
    setEEGSetupOpen(true);
  };

  const userId = me?.id;

  return (
    <div>
      <EEGSetup open={eegSetupOpen} onClose={() => onEEGSetupClose()} />
      <Overlay>
        <Row>
          <Bar>
            <h2>{userId}</h2>
            <IconButton color="secondary" onClick={onEEGSetupOpen}>
              <Settings />
            </IconButton>
          </Bar>
        </Row>
        <Row>
          <LinkWrapper>
            <GitLink href="https://github.com/CognitiveControlLab/neuro-clash">
              <GitHub fontSize="small" />
            </GitLink>
            <GitLink href="https://github.com/CognitiveControlLab/neuro-clash">
              CognitiveControlLab/neuro-clash
            </GitLink>
          </LinkWrapper>
        </Row>
      </Overlay>
      {children}
    </div>
  );
}

export default UserBarOverlay;
