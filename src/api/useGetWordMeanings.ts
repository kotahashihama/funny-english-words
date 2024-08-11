import { useQuery } from '@tanstack/react-query';

export type GetWordMeaningsResponse =
  | {
      success: true;
      frequency: number;
      pronunciation: {
        all: string;
      };
      results?: {
        antonyms?: string[];
        definition: string;
        derivation?: string[];
        examples: string[];
        partOfSpeech: string | null;
        similarTo: string[];
        synonyms?: string[];
      }[];
      syllables?: {
        count: number;
        list: string[];
      };
      word: string;
    }
  | {
      success: false;
      message: string;
    }
  | undefined;

export const useGetWordMeanings = (searchWord: string) => {
  return useQuery<GetWordMeaningsResponse>({
    queryKey: ['searchWord', searchWord],
    queryFn: async () => {
      return (
        await fetch(`https://wordsapiv1.p.rapidapi.com/words/${searchWord}`, {
          headers: {
            'x-rapidapi-host': import.meta.env.VITE_X_RAPIDAPI_HOST,
            'x-rapidapi-key': import.meta.env.VITE_X_RAPIDAPI_KEY,
          },
        })
      ).json();
    },
    enabled: false,
  });
};
