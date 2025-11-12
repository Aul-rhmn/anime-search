import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Anime } from '@/types/anime';
import { animeApi } from '@/services/animeApi';

interface AnimeState {
  searchResults: Anime[];
  selectedAnime: Anime | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  searchQuery: string;
}

const initialState: AnimeState = {
  searchResults: [],
  selectedAnime: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  searchQuery: '',
};

export const searchAnime = createAsyncThunk(
  'anime/search',
  async ({ query, page }: { query: string; page: number }) => {
    const response = await animeApi.searchAnime(query, page);
    return response;
  }
);

export const fetchAnimeById = createAsyncThunk(
  'anime/fetchById',
  async (id: number) => {
    const response = await animeApi.getAnimeById(id);
    return response.data;
  }
);

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.hasNextPage = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.data;
        state.totalPages = action.payload.pagination.last_visible_page;
        state.hasNextPage = action.payload.pagination.has_next_page;
        state.currentPage = action.meta.arg.page;
      })
      .addCase(searchAnime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch anime';
      })
      .addCase(fetchAnimeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAnime = action.payload;
      })
      .addCase(fetchAnimeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch anime details';
      });
  },
});

export const { setSearchQuery, setCurrentPage, clearSearchResults } = animeSlice.actions;
export default animeSlice.reducer;
