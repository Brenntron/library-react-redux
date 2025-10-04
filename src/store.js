import { configureStore } from '@reduxjs/toolkit';
import bookSearchReducer from './features/BookSearch/bookSearchSlice';

export default configureStore({
  reducer: {
    bookSearch: bookSearchReducer,
  },
});
