import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import OpenAI from 'openai';
import { openAi } from '../../../main';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../AppProvider/AppProvider';

export const ExampleImage = () => {
  const { searchWord, exampleSentence } = useContext(AppContext);
  const {
    data: exampleSentenceImageData,
    refetch: refetchExampleSentenceImageData,
  } = useQuery<OpenAI.Images.ImagesResponse>({
    queryKey: ['exampleSentenceImage', searchWord],
    queryFn: async () => {
      return await openAi.images.generate({
        model: 'dall-e-3',
        prompt: `
          次の例文を表現する愉快な画像を生成してください
          画像には吹き出しは不要です。描写のみですべてを表現するように努めてください。
          「${exampleSentence}」
        `,
        size: '1024x1024',
        quality: 'standard',
        n: 1,
      });
    },
    enabled: false,
  });
  const imageUrl = exampleSentenceImageData?.data[0].url;

  useEffect(() => {
    if (exampleSentence) {
      refetchExampleSentenceImageData();
    }
  }, [exampleSentence]);

  return (
    <Box>
      <img src={imageUrl} style={{ maxWidth: '100%' }}></img>
    </Box>
  );
};
