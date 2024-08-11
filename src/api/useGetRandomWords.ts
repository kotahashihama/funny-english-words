import { useQuery } from '@tanstack/react-query';

type GetRandomWordResponse = string[] | undefined;

export const useGetRandomWords = () => {
  return useQuery<GetRandomWordResponse>({
    queryKey: ['randomWords'],
    queryFn: async () => {
      return (
        await fetch('https://random-word-api.herokuapp.com/word?number=5')
      ).json();
    },
  });
};
