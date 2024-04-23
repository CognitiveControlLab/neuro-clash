import { ReactNode, useState } from 'react';
import { IconButton } from '@mui/material';
import { Settings, GitHub, PrivacyTip } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import EEGSetup from '../EEGSetup';
import {
  Bar, GitLink, LinkWrapper, Overlay, Row, Container,
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

  const navigate = useNavigate();

  const navigateToPrivacy = () => {
    navigate('/privacy');
  };

  return (
    <Container>
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
            <GitLink onClick={navigateToPrivacy}>
              <PrivacyTip fontSize="small" />
            </GitLink>
            <GitLink onClick={navigateToPrivacy}>
              <FormattedMessage id="privacy" />
            </GitLink>
          </LinkWrapper>
        </Row>
      </Overlay>
      {children}
    </Container>
  );
}

export default UserBarOverlay;
