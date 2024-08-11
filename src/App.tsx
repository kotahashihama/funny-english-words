import { Box, Paper, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

function App() {
  const { data: randomWords } = useQuery({
    queryKey: ['randomWords'],
    queryFn: async () => {
      return (
        await fetch('https://random-word-api.herokuapp.com/word?number=5')
      ).json();
    },
  });

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

  const onClickSearch = () => {
    if (searchedWord) refetch();
  };

  console.log(searchedWordData);

  return (
    <Box sx={{ margin: '100px auto 0', width: '680px' }}>
      <Box
        sx={{
          marginBottom: '48px',
        }}
      >
        <Typography
          fontSize="48px"
          sx={{
            marginBottom: '28px',
            textAlign: 'center',
            fontFamily: 'Ribeye Marrow, serif',
          }}
        >
          Funny English Words
        </Typography>

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

      <Paper sx={{ marginBottom: '48px', padding: '24px' }}>
        <Typography
          fontSize="24px"
          fontWeight="bold"
          sx={{ marginBottom: '20px' }}
        >
          applaud とは
        </Typography>

        <Box fontSize="14px">
          <Box
            sx={{
              marginBottom: '20px',
            }}
          >
            applaud 【動詞】
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Box>
              <Box>自動:</Box>
              <Box>拍手［称賛］する</Box>
            </Box>

            <Box>
              <Box>他動:</Box>
              <Box>〔～に〕拍手を送る、〔～を〕称賛する</Box>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Button variant="contained" sx={{ marginBottom: '20px' }}>
        例文を生成
      </Button>

      <Paper sx={{ padding: '24px' }}>
        <Typography
          fontSize="24px"
          fontWeight="bold"
          sx={{ marginBottom: '20px' }}
        >
          例文
        </Typography>

        <Box fontSize="14px">
          <Box sx={{ marginBottom: '20px' }}>
            <Box sx={{ marginBottom: '20px' }}>
              The city's squirrels learned to{' '}
              <span style={{ color: '#dd4e4e' }}>
                <b>applaud</b>
              </span>{' '}
              by clapping acorns together, leading to standing ovations for
              particularly impressive parkour performances among the trees.
            </Box>

            <Box>
              訳:
              街のリスたちがドングリをパンパンして拍手する技を覚えちゃってさ。木の間を飛び回る超絶パルクールに大喝采するようになったんだって。
            </Box>
          </Box>

          <Box>
            <img src="./example.webp" style={{ maxWidth: '100%' }}></img>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default App;
