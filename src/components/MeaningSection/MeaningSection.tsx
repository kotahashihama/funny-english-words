import { Box, Paper, Typography } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../AppProvider/AppProvider';

export const MeaningSection = () => {
  const { wordMeaningData } = useContext(AppContext);

  const hasNoMeaningData =
    !wordMeaningData ||
    ('success' in wordMeaningData && !wordMeaningData.success);
  if (hasNoMeaningData) {
    return null;
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
          {!('results' in wordMeaningData) && (
            <Box>意味が取得できませんでした</Box>
          )}
          {wordMeaningData.results?.map((result, i) => (
            <Box key={i}>
              <Box>[{result.partOfSpeech}]</Box>
              <Box>{result.definition}</Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};
