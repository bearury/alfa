import { JSX } from 'react';

export interface Router {
  path: string;
  Component: () => JSX.Element;
}
