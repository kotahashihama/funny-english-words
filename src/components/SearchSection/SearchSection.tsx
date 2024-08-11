import { Refresh } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppProvider/AppProvider';

type GetRandomWordResponse = string[] | undefined;
export type GetWordMeaningsResponse =
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
  const [inputWord, setInputWord] = useState<string>('');
  const { searchWord, setSearchWord, setWordMeaningData } =
    useContext(AppContext);
  const { refetch: refetchWordMeanings } = useQuery<GetWordMeaningsResponse>({
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

  const { data: randomWords, refetch: refetchRandomWords } =
    useQuery<GetRandomWordResponse>({
      queryKey: ['randomWords'],
      queryFn: async () => {
        return (
          await fetch('https://random-word-api.herokuapp.com/word?number=5')
        ).json();
      },
    });

  useEffect(() => {
    (async () => {
      if (searchWord) {
        const { data } = await refetchWordMeanings();
        setWordMeaningData(data);
      }
    })();
  }, [searchWord]);

  const onClickSearch = () => {
    setSearchWord(inputWord);
  };

  const onClickRandomWord = async (word: string) => {
    setSearchWord(word);
    setInputWord(word);
  };

  const onClickRefreshRandomWords = () => {
    refetchRandomWords();
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
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
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
        <IconButton onClick={onClickRefreshRandomWords}>
          <Refresh />
        </IconButton>
      </Box>
    </Box>
  );
};
