import { Navigate, Route, Routes } from 'react-router';
import { routes } from './routes.ts';

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};
