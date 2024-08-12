import { useContext } from 'react';
import { AppContext } from '../../AppProvider/AppProvider';
import { useGetExampleSentence } from '../../../api/useGetExampleSentence';
import { Button } from '@mui/material';

export const GenerateButton = () => {
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
