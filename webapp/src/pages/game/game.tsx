import { Grid, Input } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import Hints from './components/Hints/Hints';
import { Container } from './styles';

function Game() {
  const { formatMessage } = useIntl();

  return (
    <Grid container>
      <Grid item xs={1} md={2} />
      <Grid item xs={10} md={8}>
        <Container>
          <h1>
            <FormattedMessage id="game.name" />
          </h1>
          <Input placeholder={formatMessage({ id: 'game.type' })} />
          <Hints hints={[]} />
        </Container>
      </Grid>
      <Grid item xs={1} md={2} />
    </Grid>
  );
}

export default Game;
