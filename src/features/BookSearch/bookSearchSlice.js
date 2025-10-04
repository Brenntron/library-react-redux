import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const searchBooks = createAsyncThunk(
  'bookSearch/searchBooks',
  async (query) => {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
);

const initialState = {
  query: '',
  results: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const bookSearchSlice = createSlice({
  name: 'bookSearch',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload.docs;
        state.error = null;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setQuery, clearResults } = bookSearchSlice.actions;

export const selectQuery = (state) => state.bookSearch.query;
export const selectResults = (state) => state.bookSearch.results;
export const selectStatus = (state) => state.bookSearch.status;
export const selectError = (state) => state.bookSearch.error;

export default bookSearchSlice.reducer;

