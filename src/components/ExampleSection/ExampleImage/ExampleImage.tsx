import { Box, CircularProgress } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useGetExampleImage } from '../../../api/useGetExampleImage';
import { AppContext } from '../../AppProvider/AppProvider';
import { Error } from '../../Error/Error';

export const ExampleImage = () => {
  const { searchWord, exampleSentence } = useContext(AppContext);
  const {
    data: exampleSentenceImageData,
    refetch: refetchExampleSentenceImageData,
    isLoading,
    isError,
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

  if (isError) {
    return <Error onClick={() => refetchExampleSentenceImageData()} />;
  }

  return (
    <Box>
      <img src={imageUrl} style={{ maxWidth: '100%' }}></img>
    </Box>
  );
};
