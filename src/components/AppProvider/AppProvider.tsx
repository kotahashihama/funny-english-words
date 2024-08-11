import { createContext, PropsWithChildren, useState } from 'react';

type AppContextType = {
  searchWord: string;
  setSearchWord: (searchWord: string) => void;
};

export const AppContext = createContext<AppContextType>({
  searchWord: '',
  setSearchWord: () => {},
});

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [searchWord, setSearchWord] = useState('');

  return (
    <AppContext.Provider value={{ searchWord, setSearchWord }}>
      {children}
    </AppContext.Provider>
  );
};
