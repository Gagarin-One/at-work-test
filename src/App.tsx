
import { RouterProvider } from 'react-router-dom';
import { router } from './app/routing';
import { AppProviders } from './app/providers';
import './app/styles/global.scss';

function App() {
  return (
    <div style={{ 
      minWidth: '360px', 
      width: '100%',
      overflowX: 'auto',
      position: 'relative'
    }}>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </div>
  );
}

export default App;