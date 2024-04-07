import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useGameClient } from '../../../../providers/GameClientProvider';
import { Container, Content } from './styles';

function EndGame() {
  const navigate = useNavigate();

  const {
    progress,
    me,
  } = useGameClient();
  const { gameId } = useParams();

  const onReplay = () => {
    navigate(`/${gameId}R`);
    navigate(0);
  };

  const myProgress = useMemo(() => progress?.find((p: any) => p.id === me?.id), [progress, me]);
  const tie = useMemo(() => progress?.every((p: any) => p.isWinner), [progress]);

  return (
    <Container>
      <Content>
        {myProgress?.isWinner && !tie && <h1><FormattedMessage id="end_game.win" /></h1>}
        {!myProgress?.isWinner && !tie && <h1><FormattedMessage id="end_game.lose" /></h1>}
        {tie && <h1><FormattedMessage id="end_game.tie" /></h1>}

        <Button variant="contained" color="primary" onClick={onReplay}>
          <FormattedMessage id="end_game.play_again" />
        </Button>
      </Content>
    </Container>
  );
}

export default EndGame;
