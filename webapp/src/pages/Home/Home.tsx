import { Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Container } from './styles';

function Home() {
  const navigate = useNavigate();

  const onGameStart = () => {
    navigate(`/${uuidv4()}`);
  };

  return (
    <Container>
      <Button onClick={onGameStart}>
        <h1>
          <FormattedMessage id="start" />
        </h1>
      </Button>
    </Container>
  );
}

export default Home;
