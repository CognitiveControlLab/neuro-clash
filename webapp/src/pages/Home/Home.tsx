import { Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Title } from './styles';
import { StarsBackground } from '../../components/Stars';

function Home() {
  const navigate = useNavigate();

  const onGameStart = () => {
    navigate(`/${uuidv4()}`);
  };

  return (
    <StarsBackground>
      <Button onClick={onGameStart}>
        <Title>
          <FormattedMessage id="home.start" />
        </Title>
      </Button>
    </StarsBackground>
  );
}

export default Home;
