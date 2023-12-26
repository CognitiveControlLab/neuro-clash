import { Grid } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import Hints from './components/Hints/Hints';
import { Container } from './styles';

function Game() {
  // TO-DO: Get from gaem state
  const tempHint = [{
    discoverd: true,
    imageUrl: 'https://pbs.twimg.com/media/FPsXAFAVcAIJWf4?format=jpg&name=900x900',
  }, {
    discoverd: false,
    imageUrl: undefined,
  }, {
    discoverd: false,
    imageUrl: undefined,
  }];

  return (
    <Grid container>
      <Grid item xs={1} md={2} />
      <Grid item xs={10} md={8}>
        <Container>
          <h1>
            <FormattedMessage id="game.name" />
          </h1>
          <Hints hints={tempHint} />
        </Container>
      </Grid>
      <Grid item xs={1} md={2} />
    </Grid>
  );
}

export default Game;
