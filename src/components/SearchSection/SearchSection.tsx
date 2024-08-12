import { Refresh } from '@mui/icons-material';
import { Box, CircularProgress, IconButton, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useContext, useRef, useState } from 'react';
import { useGetRandomWords } from '../../api/useGetRandomWords';
import { AppContext } from '../AppProvider/AppProvider';
import { useGetWordMeanings } from '../../api/useGetWordMeanings';

const validateInput = (value: string) => {
  return /^[a-zA-Z]*$/.test(value);
};

export const SearchSection = () => {
  const [inputWord, setInputWord] = useState<string>('');
  const [inputError, setInputError] = useState(false);
  const { searchWord, setSearchWord } = useContext(AppContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data: randomWords,
    refetch: refetchRandomWords,
    isLoading: isLoadingRandomWords,
  } = useGetRandomWords();
  const { isLoading: isLoadingWordMeanings } = useGetWordMeanings(searchWord);

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
          helperText={inputError ? '英字のみ入力が可能です' : ''}
          InputProps={{
            inputProps: {
              pattern: '^[a-zA-Z]*$',
            },
          }}
        />
        <Button
          variant="contained"
          onClick={onClickSearch}
          disabled={inputError || !inputWord || isLoadingWordMeanings}
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
        {isLoadingRandomWords ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          randomWords?.map((word: string) => (
            <Button key={word} onClick={() => onClickRandomWord(word)}>
              {word}
            </Button>
          ))
        )}
        <IconButton onClick={onClickRefreshRandomWords}>
          <Refresh />
        </IconButton>
      </Box>
    </Box>
  );
};
