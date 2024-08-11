import { useQuery } from '@tanstack/react-query';
import OpenAI from 'openai';
import { openAi } from '../main';

export const useGetExampleImage = (
  searchWord: string,
  exampleSentence: string
) => {
  return useQuery<OpenAI.Images.ImagesResponse>({
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
};
