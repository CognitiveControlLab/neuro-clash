import {
  Routes,
  Route,
} from 'react-router-dom';
import Home from '../pages/Home';
import Game from '../pages/game/Game'
import NotFound from '../pages/notFound/NotFound';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:gameId" element={<Game />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
