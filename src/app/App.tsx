import { BrowserRouter } from 'react-router';
import { AppRouter } from '@app/AppRouter.tsx';
import { RootLayout } from '../modules/root-layout/RootLayout.tsx';

export const App = () => {
  return (
    <BrowserRouter>
      <RootLayout>
        <AppRouter />
      </RootLayout>
    </BrowserRouter>
  );
};
