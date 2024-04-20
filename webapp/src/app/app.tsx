import {
  BrowserRouter as Router,
} from 'react-router-dom';
import AppProviders from './appProviders';
import { Background, RoutesContainer } from './styles';
import AppRoutes from './routes';

function App() {
  return (
    <AppProviders>
      <Router>
        <Background>
          <RoutesContainer>
            <AppRoutes />
          </RoutesContainer>
        </Background>
      </Router>
    </AppProviders>
  );
}

export default App;
