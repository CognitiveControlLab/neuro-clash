import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Image,
  Title,
  Button,
} from './styles';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <Image src="/not_found.png" />
      <Title>
        <FormattedMessage id="error.code.404" />
      </Title>
      <Title>
        <FormattedMessage id="error.description.not_found" />
      </Title>
      <Button onClick={() => navigate('/')}>
        <FormattedMessage id="navigation.return_home" />
      </Button>
    </Container>
  );
}

export default NotFound;
