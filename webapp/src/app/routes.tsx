import {
  Routes,
  Route,
} from 'react-router-dom';
import Home from '../pages/Home';
import Game from '../pages/Game';
import NotFound from '../pages/NotFound';
import PrivacyNotice from '../pages/PrivacyNotice';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:gameId" element={<Game />} />
      <Route path="/privacy" element={<PrivacyNotice />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
