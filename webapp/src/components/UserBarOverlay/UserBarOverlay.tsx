/* eslint-disable jsx-a11y/anchor-is-valid */
import { ReactNode, useState } from 'react';
import { IconButton } from '@mui/material';
import { Settings, GitHub, PrivacyTip } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import EEGSetup from '../EEGSetup';
import {
  Bar, Link, LinkWrapper, Overlay, Row, Container,
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
            <Link href="https://github.com/CognitiveControlLab/neuro-clash">
              <GitHub fontSize="small" />
            </Link>
            <Link href="https://github.com/CognitiveControlLab/neuro-clash">
              CognitiveControlLab/neuro-clash
            </Link>
            <Link onClick={navigateToPrivacy}>
              <PrivacyTip fontSize="small" />
            </Link>
            <Link onClick={navigateToPrivacy}>
              <FormattedMessage id="privacy" />
            </Link>
          </LinkWrapper>
        </Row>
      </Overlay>
      {children}
    </Container>
  );
}

export default UserBarOverlay;
