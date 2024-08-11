import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { GetWordMeaningResponse } from '../SearchSection/SearchSection';

type AppContextType = {
  searchWord: string;
  setSearchWord: Dispatch<SetStateAction<string>>;
  wordMeaningData: GetWordMeaningResponse;
  setWordMeaningData: Dispatch<SetStateAction<GetWordMeaningResponse>>;
};

export const AppContext = createContext<AppContextType>({
  searchWord: '',
  setSearchWord: () => {},
  wordMeaningData: undefined,
  setWordMeaningData: () => {},
});

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [searchWord, setSearchWord] =
    useState<AppContextType['searchWord']>('');
  const [wordMeaningData, setWordMeaningData] =
    useState<AppContextType['wordMeaningData']>(undefined);

  const value = useMemo(() => {
    return {
      searchWord,
      setSearchWord,
      wordMeaningData,
      setWordMeaningData,
    };
  }, [searchWord, setSearchWord, wordMeaningData, setWordMeaningData]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
