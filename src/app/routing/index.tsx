
import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../../pages/main-page/index';
import { EditPage } from '../../pages/edit-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/edit/:id',
    element: <EditPage />,
  },
]);