import { Refresh } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useContext, useEffect, useRef, useState } from 'react';
import { useGetRandomWords } from '../../api/useGetRandomWords';
import { useGetWordMeanings } from '../../api/useGetWordMeanings';
import { AppContext } from '../AppProvider/AppProvider';

export const SearchSection = () => {
  const [inputWord, setInputWord] = useState<string>('');
  const [inputError, setInputError] = useState(false);
  const { searchWord, setSearchWord, setWordMeaningData } =
    useContext(AppContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const { refetch: refetchWordMeanings } = useGetWordMeanings(searchWord);

  const { data: randomWords, refetch: refetchRandomWords } =
    useGetRandomWords();

  useEffect(() => {
    (async () => {
      if (searchWord) {
        const { data } = await refetchWordMeanings();
        setWordMeaningData(data);
      }
    })();
  }, [searchWord]);

  const validateInput = (value: string) => {
    return /^[a-zA-Z]*$/.test(value);
  };

  const onChangeInputWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputWord(newValue);
    if (validateInput(newValue)) {
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const onClickSearch = () => {
    if (!inputError && inputWord) {
      setSearchWord(inputWord);
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (!inputError && inputWord) {
        onClickSearch();
      } else {
        e.preventDefault();
      }
    }
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
          inputRef={inputRef}
          error={inputError}
          value={inputWord}
          onChange={onChangeInputWord}
          onKeyPress={onKeyPress}
          helperText={inputError ? '英字のみ入力可能です' : ''}
          InputProps={{
            inputProps: {
              pattern: '^[a-zA-Z]*$',
            },
          }}
        />
        <Button
          variant="contained"
          onClick={onClickSearch}
          disabled={inputError || !inputWord}
        >
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
