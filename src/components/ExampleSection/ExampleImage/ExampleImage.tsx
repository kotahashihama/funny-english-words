import { Box, CircularProgress } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useGetExampleImage } from '../../../api/useGetExampleImage';
import { AppContext } from '../../AppProvider/AppProvider';

export const ExampleImage = () => {
  const { searchWord, exampleSentence } = useContext(AppContext);
  const {
    data: exampleSentenceImageData,
    refetch: refetchExampleSentenceImageData,
    isLoading,
  } = useGetExampleImage(searchWord, exampleSentence);
  const imageUrl = exampleSentenceImageData?.data[0].url;

  useEffect(() => {
    if (exampleSentence) {
      refetchExampleSentenceImageData();
    }
  }, [exampleSentence]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <img src={imageUrl} style={{ maxWidth: '100%' }}></img>
    </Box>
  );
};
