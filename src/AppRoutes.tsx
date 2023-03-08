import { Character, Characters } from './components';

const AppRoutes = [
  {
    path: '/',
    element: <Characters />
  },
  {
    path: '/character/:id',
    index: true,
    element: <Character />
  }
];

export default AppRoutes;
