import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { useState } from 'react';
import AppProviders from './appProviders';
import { Background, RoutesContainer } from './styles';
import NavigationBar from '../components/NavigationBar';
import AppRoutes from './routes';

function App() {
  const [navigationBarDrawerOpen, setNavigationBarDrawerOpen] = useState<boolean>(false);

  return (
    <AppProviders>
      <Router>
        <Background>
          <NavigationBar
            drawerOpen={navigationBarDrawerOpen}
            onDrawerOpenChange={(open: boolean) => setNavigationBarDrawerOpen(open)}
          />
          <RoutesContainer>
            <AppRoutes />
          </RoutesContainer>
        </Background>
      </Router>
    </AppProviders>
  );
}

export default App;
