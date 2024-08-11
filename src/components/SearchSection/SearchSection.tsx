import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const SearchSection = () => {
  const [searchedWord, setSearchedWord] = useState('');
  const { data: searchedWordData, refetch } = useQuery({
    queryKey: ['searchedWord', searchedWord],
    queryFn: async () => {
      return (
        await fetch(`https://wordsapiv1.p.rapidapi.com/words/${searchedWord}`, {
          headers: {
            'x-rapidapi-host': import.meta.env.VITE_X_RAPIDAPI_HOST,
            'x-rapidapi-key': import.meta.env.VITE_X_RAPIDAPI_KEY,
          },
        })
      ).json();
    },
    enabled: false,
  });

  const { data: randomWords } = useQuery({
    queryKey: ['randomWords'],
    queryFn: async () => {
      return (
        await fetch('https://random-word-api.herokuapp.com/word?number=5')
      ).json();
    },
  });

  const onClickSearch = () => {
    if (searchedWord) refetch();
  };

  console.log(searchedWordData);

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
          value={searchedWord}
          onChange={(e) => setSearchedWord(e.target.value)}
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
          <Button key={word}>{word}</Button>
        ))}
      </Box>
    </Box>
  );
};
