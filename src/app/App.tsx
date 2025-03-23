import { BrowserRouter } from 'react-router';
import { AppRouter } from '@app/AppRouter.tsx';
import { RootLayout } from '../modules/root-layout/RootLayout.tsx';

export const App = () => {
  return (
    <BrowserRouter basename='/alfa'>
      <RootLayout>
        <AppRouter />
      </RootLayout>
    </BrowserRouter>
  );
};
