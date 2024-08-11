import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';
import { useContext, useEffect } from 'react';
import { useGetExampleSentence } from '../../api/useGetExampleSentence';
import { AppContext } from '../AppProvider/AppProvider';
import { ExampleImage } from './ExampleImage/ExampleImage';

export const ExampleSection = () => {
  const { wordMeaningData, searchWord, setExampleSentence } =
    useContext(AppContext);

  const {
    data: exampleSentenceData,
    refetch: refetchExampleSentenceData,
    isLoading,
  } = useGetExampleSentence(searchWord);

  const parsedData: {
    en: string;
    ja: string;
  } = JSON.parse(exampleSentenceData?.choices[0].message.content || '{}');

  useEffect(() => {
    if (parsedData) setExampleSentence(parsedData.ja);
  }, [parsedData]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const hasNoMeaningData =
    !wordMeaningData ||
    ('success' in wordMeaningData && !wordMeaningData.success) ||
    !wordMeaningData.results;
  if (hasNoMeaningData) {
    return null;
  }

  const onClickGenerate = () => {
    refetchExampleSentenceData();
  };

  if (!exampleSentenceData) {
    return (
      <Button
        variant="contained"
        sx={{ marginBottom: '20px' }}
        onClick={onClickGenerate}
      >
        例文を生成
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="contained"
        sx={{ marginBottom: '20px' }}
        onClick={onClickGenerate}
      >
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
          <Box sx={{ marginBottom: '32px' }}>
            <Box
              sx={{
                marginBottom: '20px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {parsedData.en}
            </Box>
            <Box>{parsedData.ja}</Box>
          </Box>

          <ExampleImage />
        </Box>
      </Paper>
    </>
  );
};
