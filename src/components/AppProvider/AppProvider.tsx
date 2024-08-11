import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { GetWordMeaningsResponse } from '../SearchSection/SearchSection';

type AppContextType = {
  searchWord: string;
  setSearchWord: Dispatch<SetStateAction<string>>;
  wordMeaningData: GetWordMeaningsResponse;
  setWordMeaningData: Dispatch<SetStateAction<GetWordMeaningsResponse>>;
  exampleSentence: string;
  setExampleSentence: Dispatch<SetStateAction<string>>;
};

export const AppContext = createContext<AppContextType>({
  searchWord: '',
  setSearchWord: () => {},
  wordMeaningData: undefined,
  setWordMeaningData: () => {},
  exampleSentence: '',
  setExampleSentence: () => {},
});

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [searchWord, setSearchWord] =
    useState<AppContextType['searchWord']>('');
  const [wordMeaningData, setWordMeaningData] =
    useState<AppContextType['wordMeaningData']>(undefined);
  const [exampleSentence, setExampleSentence] = useState<string>('');

  const value = useMemo(() => {
    return {
      searchWord,
      setSearchWord,
      wordMeaningData,
      setWordMeaningData,
      exampleSentence,
      setExampleSentence,
    };
  }, [searchWord, wordMeaningData, exampleSentence]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
