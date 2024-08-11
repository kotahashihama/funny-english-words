import { Box, Paper, Typography } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../AppProvider/AppProvider';

export const MeaningSection = () => {
  const { searchWord, wordMeaningData } = useContext(AppContext);

  const hasNoMeaningData =
    !wordMeaningData ||
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
              <Box>[{result.partOfSpeech || '?'}]</Box>
              <Box>{result.definition}</Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};
