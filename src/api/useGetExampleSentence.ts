import { useQuery } from '@tanstack/react-query';
import OpenAI from 'openai';
import { openAi } from '../main';

export const useGetExampleSentence = (searchWord: string) => {
  const systemPrompt = `
    あなたは日本語話者で、プロの英語教師であるとともにプロのお笑い芸人でもあります。
    生徒に楽しく英語を学んでもらえるよう、お笑い芸人の経験を活かし日々の授業に様々な工夫を凝らしています。
  `;
  const userPrompt = `
    生徒に「${searchWord}」という単語の使い方を教えるために、ジョークを交えた面白い例文を考えてください。
    ただし、あなたの生徒は英語が母国語ではないため単語の語源や歴史を元にしたジョークは通じません。
    そのため、英文から考えるのではなくて日本語の文章を英訳する形で例文を考えるといいでしょう。

    英訳の際は必ず「${searchWord}」を含めるようにしてください。
    「${searchWord}」の日本語訳としてカタカナ英語や「${searchWord}」をそのまま使うのは避けてください。

    例文の内容は生徒が理解しやすいものである必要があります。あまりに意図が不明なジョークや学術性の高いジョークは避けてください。
    「Why~? Because」などのありがちなジョークの定型文は濫用は避け、多様で面白い例文を作ってください。

    回答は以下の形式を厳守してください。
    なお、Markdown のコードブロック等で囲む必要はなく、純粋な JSON 形式で回答してください。
    またこれは配列ではないため、単一の JSON オブジェクトとして回答してください。

    {
      "en": "<English example sentence>"
      "ja": "<日本語訳>",
    }
  `;

  return useQuery<OpenAI.Chat.Completions.ChatCompletion>({
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
};
