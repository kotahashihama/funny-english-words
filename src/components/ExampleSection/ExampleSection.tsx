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
import { Error } from '../Error/Error';

const GenerateButton = () => {
  const { searchWord } = useContext(AppContext);
  const { refetch: refetchExampleSentenceData, isLoading } =
    useGetExampleSentence(searchWord);

  const onClickGenerate = () => {
    refetchExampleSentenceData();
  };

  return (
    <Button
      variant="contained"
      sx={{ marginBottom: '20px' }}
      onClick={onClickGenerate}
      disabled={isLoading}
    >
      例文を生成
    </Button>
  );
};

export const ExampleSection = () => {
  const { wordMeaningData, searchWord, setExampleSentence } =
    useContext(AppContext);

  const {
    data: exampleSentenceData,
    refetch: refetchExampleSentenceData,
    isLoading,
    isError,
  } = useGetExampleSentence(searchWord);
  const parsedExampleSentenceData: {
    en: string;
    ja: string;
  } = JSON.parse(exampleSentenceData?.choices[0].message.content || '{}');

  useEffect(() => {
    if (parsedExampleSentenceData)
      setExampleSentence(parsedExampleSentenceData.ja);
  }, [parsedExampleSentenceData]);

  if (isLoading) {
    return (
      <>
        <GenerateButton />

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (isError) {
    return <Error onClick={() => refetchExampleSentenceData} />;
  }

  const hasNoMeaningData =
    !wordMeaningData ||
    ('success' in wordMeaningData && !wordMeaningData.success) ||
    !wordMeaningData.results;
  if (hasNoMeaningData) {
    return null;
  }

  if (!exampleSentenceData) {
    return <GenerateButton />;
  }

  return (
    <>
      <GenerateButton />

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
              {parsedExampleSentenceData.en}
            </Box>
            <Box>{parsedExampleSentenceData.ja}</Box>
          </Box>

          <ExampleImage />
        </Box>
      </Paper>
    </>
  );
};
