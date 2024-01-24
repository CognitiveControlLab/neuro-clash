import {
  BrowserRouter as Router,
} from 'react-router-dom';
import AppProviders from './appProviders';
import { Background, RoutesContainer } from './styles';
import AppRoutes from './routes';
import UserBarOverlay from '../components/UserBarOverlay/UserBarOverlay';

function App() {
  return (
    <AppProviders>
      <Router>
        <Background>
          <UserBarOverlay>
            <RoutesContainer>
              <AppRoutes />
            </RoutesContainer>
          </UserBarOverlay>
        </Background>
      </Router>
    </AppProviders>
  );
}

export default App;
