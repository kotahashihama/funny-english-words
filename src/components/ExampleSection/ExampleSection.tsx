import { Box, Button, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import OpenAI from 'openai';
import { useContext } from 'react';
import { AppContext } from '../AppProvider/AppProvider';
import { openAi } from '../../main';

export const ExampleSection = () => {
  const { wordMeaningData, searchWord } = useContext(AppContext);
  const systemPrompt = `
    あなたは日本語話者で、プロの英語教師であるとともにプロのお笑い芸人でもあります。
    生徒に楽しく英語を学んでもらえるよう、お笑い芸人の経験を活かし日々の授業に様々な工夫を凝らしています。
  `;
  const userPrompt = `
    生徒に「${searchWord}」という単語の使い方を教えるために、冗談を交えた面白い例文を考えてください。
    ただし、あなたの生徒は英語が母国語ではないため単語の語源や歴史を元にした冗談は通じません。
    そのため、英文から考えるのではなくて日本語の文章を英訳する形で例文を考えるといいでしょう。
    英訳の際は必ず「${searchWord}」を含めるようにしてください。
    「${searchWord}」の日本語訳としてカタカナ英語や「${searchWord}」をそのまま使うのは避けてください。
    例文の内容は生徒が理解しやすいものである必要があります。あまりに意図が不明な冗談や学術性の高い冗談は避けてください。

    回答は以下の形式を厳守してください。
    なお、Markdown のコードブロック等で囲む必要はなく、純粋な JSON 形式で回答してください。

    {
      "en": "<English example sentence>"
      "ja": "<日本語訳>",
    }
  `;

  const { data: exampleSentenceData, refetch: refetchExampleSentenceData } =
    useQuery<OpenAI.Chat.Completions.ChatCompletion>({
      queryKey: ['exampleSentence', searchWord],
      queryFn: async () => {
        return await openAi.chat.completions.create({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          model: 'gpt-4o-mini',
        });
      },
      enabled: false,
    });
  const {
    data: exampleSentenceImageData,
    refetch: refetchExampleSentenceImageData,
  } = useQuery<OpenAI.Images.ImagesResponse>({
    queryKey: ['exampleSentenceImage', searchWord],
    queryFn: async () => {
      return await openAi.images.generate({
        model: 'dall-e-3',
        prompt: `"I wanted to play catch with my dog, so I went outside to mete out the rules: no cheating, no barking at the neighbors, and most importantly, no stealing my snacks!" を表現する愉快な画像を生成してください。`,
        size: '1024x1024',
        quality: 'standard',
        n: 1,
      });
    },
    enabled: false,
  });

  const hasNoMeaningData =
    !wordMeaningData ||
    ('success' in wordMeaningData && !wordMeaningData.success);
  if (hasNoMeaningData) {
    return null;
  }

  if (!exampleSentenceData) {
    return (
      <Button
        variant="contained"
        sx={{ marginBottom: '20px' }}
        onClick={() => {
          refetchExampleSentenceData();
          refetchExampleSentenceImageData();
        }}
      >
        例文を生成
      </Button>
    );
  }

  const parsedData: {
    en: string;
    ja: string;
  } = JSON.parse(exampleSentenceData?.choices[0].message.content || '{}');
  const imageUrl = exampleSentenceImageData?.data[0].url;

  return (
    <>
      <Button
        variant="contained"
        sx={{ marginBottom: '20px' }}
        onClick={() => {
          refetchExampleSentenceData();
          refetchExampleSentenceImageData();
        }}
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
          <Box sx={{ marginBottom: '20px' }}>
            <Box sx={{ marginBottom: '20px' }}>{parsedData.en}</Box>
            <Box>訳: {parsedData.ja}</Box>
          </Box>

          <Box>
            <img src={imageUrl} style={{ maxWidth: '100%' }}></img>
          </Box>
        </Box>
      </Paper>
    </>
  );
};
