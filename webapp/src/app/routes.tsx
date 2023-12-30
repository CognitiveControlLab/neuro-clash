import {
  Routes,
  Route,
} from 'react-router-dom';
import Game from '../pages/game';
import NotFound from '../pages/notFound/notFound';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Game />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
