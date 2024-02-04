import {
  Routes,
  Route,
} from 'react-router-dom';
import Game from '../pages/Game';
import NotFound from '../pages/NotFound';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Game />} />
      <Route path="/:gameId" element={<Game />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
