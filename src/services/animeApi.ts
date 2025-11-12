import axios, { AxiosError } from 'axios';
import { AnimeSearchResponse, AnimeDetailResponse } from '@/types/anime';

const BASE_URL = 'https://api.jikan.moe/v4';

let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000;

const rateLimitedRequest = async <T>(requestFn: () => Promise<T>): Promise<T> => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest));
  }
  
  lastRequestTime = Date.now();
  
  try {
    return await requestFn();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      throw new Error('Too many requests. Please wait a moment and try again.');
    }
    throw error;
  }
};

export const animeApi = {
  searchAnime: async (query: string, page: number = 1): Promise<AnimeSearchResponse> => {
    return rateLimitedRequest(async () => {
      const response = await axios.get<AnimeSearchResponse>(
        `${BASE_URL}/anime`,
        {
          params: {
            q: query,
            page,
            limit: 25,
          },
        }
      );
      return response.data;
    });
  },

  getAnimeById: async (id: number): Promise<AnimeDetailResponse> => {
    return rateLimitedRequest(async () => {
      const response = await axios.get<AnimeDetailResponse>(
        `${BASE_URL}/anime/${id}`
      );
      return response.data;
    });
  },
};
