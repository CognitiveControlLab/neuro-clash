import {
  Routes,
  Route,
} from 'react-router-dom';
import Game from '../pages/Game';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home/Home';

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
