import { createContext } from 'react';

export const PageContext = createContext({
  page: 1,
  setPage: () => {},
});
