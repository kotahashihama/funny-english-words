import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useContext } from 'react';
import { AppContext } from '../AppProvider/AppProvider';

type GetRandomWordResponse = string[] | undefined;
export type GetWordMeaningResponse =
  | {
      success: true;
      frequency: number;
      pronunciation: {
        all: string;
      };
      results?: {
        antonyms?: string[];
        definition: string;
        derivation?: string[];
        examples: string[];
        partOfSpeech: string | null;
        similarTo: string[];
        synonyms?: string[];
      }[];
      syllables?: {
        count: number;
        list: string[];
      };
      word: string;
    }
  | {
      success: false;
      message: string;
    }
  | undefined;

export const SearchSection = () => {
  const { searchWord, setSearchWord, setWordMeaningData } =
    useContext(AppContext);
  const { refetch } = useQuery<GetWordMeaningResponse>({
    queryKey: ['searchWord', searchWord],
    queryFn: async () => {
      return (
        await fetch(`https://wordsapiv1.p.rapidapi.com/words/${searchWord}`, {
          headers: {
            'x-rapidapi-host': import.meta.env.VITE_X_RAPIDAPI_HOST,
            'x-rapidapi-key': import.meta.env.VITE_X_RAPIDAPI_KEY,
          },
        })
      ).json();
    },
    enabled: false,
  });

  const { data: randomWords } = useQuery<GetRandomWordResponse>({
    queryKey: ['randomWords'],
    queryFn: async () => {
      return (
        await fetch('https://random-word-api.herokuapp.com/word?number=5')
      ).json();
    },
  });

  const performSearch = useCallback(async () => {
    if (searchWord) {
      const { data } = await refetch();
      setWordMeaningData(data);
    }
  }, [searchWord, refetch, setWordMeaningData]);

  const onClickSearch = () => {
    performSearch();
  };

  const onClickRandomWord = async (word: string) => {
    setSearchWord(word);
  };

  return (
    <Box
      sx={{
        marginBottom: '48px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          marginBottom: '32px',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <TextField
          id="standard-basic"
          label="単語を入力"
          sx={{
            marginRight: '16px',
            width: '400px',
            '& .MuiInputBase-input': {
              background: '#fff',
            },
          }}
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <Button variant="contained" onClick={onClickSearch}>
          検索
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          textAlign: 'center',
        }}
      >
        {randomWords?.map((word: string) => (
          <Button key={word} onClick={() => onClickRandomWord(word)}>
            {word}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
