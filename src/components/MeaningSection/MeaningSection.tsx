import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { AppContext } from '../AppProvider/AppProvider';
import { useGetWordMeanings } from '../../api/useGetWordMeanings';

const partOfSpeechMap: Record<string, string> = {
  noun: '名詞',
  pronoun: '代名詞',
  verb: '動詞',
  adjective: '形容詞',
  adverb: '副詞',
  preposition: '前置詞',
  article: '冠詞',
  conjunction: '接続詞',
};

export const MeaningSection = () => {
  const { searchWord, wordMeaningData, setWordMeaningData } =
    useContext(AppContext);
  const { refetch: refetchWordMeanings, isLoading } =
    useGetWordMeanings(searchWord);

  useEffect(() => {
    (async () => {
      if (searchWord) {
        const { data } = await refetchWordMeanings();
        setWordMeaningData(data);
      }
    })();
  }, [searchWord]);

  if (!searchWord) {
    return null;
  }

  if (!wordMeaningData || isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const hasNoMeaningData =
    ('success' in wordMeaningData && !wordMeaningData.success) ||
    !wordMeaningData.results;
  if (hasNoMeaningData) {
    return (
      <Paper sx={{ marginBottom: '48px', padding: '24px' }}>
        ごめんなさい、単語「{searchWord}」に関するデータが見つかりませんでした。
      </Paper>
    );
  }

  return (
    <Paper sx={{ marginBottom: '48px', padding: '24px' }}>
      <Box sx={{ marginBottom: '16px' }}>
        <Typography
          fontSize="24px"
          fontWeight="bold"
          sx={{ marginRight: '8px', marginBottom: '20px' }}
          component="span"
        >
          {wordMeaningData.word}
        </Typography>
      </Box>

      <Box fontSize="14px">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {wordMeaningData.results?.map((result, i) => (
            <Box key={i}>
              <Box>
                [
                {result.partOfSpeech
                  ? partOfSpeechMap[result.partOfSpeech]
                  : '?'}
                ]
              </Box>
              <Box>{result.definition}</Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};
