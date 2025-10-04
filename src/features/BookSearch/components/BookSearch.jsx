import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../core/ui/input';
import {
  searchBooks,
  setQuery,
  selectQuery,
  selectResults,
  selectStatus,
  selectError
} from '../bookSearchSlice';

export default function BookSearch() {
  const dispatch = useDispatch();
  const query = useSelector(selectQuery);
  const results = useSelector(selectResults);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      if (query.trim()) {
        dispatch(searchBooks(query));
      }
    }, 500); // Debounce search for better performance

    return () => clearTimeout(searchTimer);
  }, [query, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setQuery(e.target.value));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search for books or authors..."
          value={query}
          onChange={handleSearchChange}
          className="text-lg"
          aria-label="Search books"
        />
      </div>

      {status === 'loading' && (
        <div className="text-center text-gray-600">Searching...</div>
      )}

      {status === 'failed' && (
        <div className="text-center text-red-600">
          Error: {error}
        </div>
      )}

      {status === 'succeeded' && results.length === 0 && (
        <div className="text-center text-gray-600">
          No results found
        </div>
      )}

      {status === 'succeeded' && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((book) => (
            <div
              key={book.key}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-lg mb-2">{book.title}</h3>
              {book.author_name && (
                <p className="text-gray-600">
                  by {book.author_name.join(', ')}
                </p>
              )}
              {book.first_publish_year && (
                <p className="text-gray-500 text-sm mt-2">
                  First published: {book.first_publish_year}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
