import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import BookCard from './BookCard';

const BookSearch = ({ onAdd }) => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState({});

  const searchBooks = useCallback(
    debounce(async (searchQuery) => {
      if (!searchQuery) {
        setBooks([]);
        return;
      }
      if (cache[searchQuery]) {
        setBooks(cache[searchQuery]);
        return;
      }
      setLoading(true);
      try {
        const res = await axios.get(`https://openlibrary.org/search.json?q=${searchQuery}&limit=10&page=1`);
        setBooks(res.data.docs);
        setCache((prevCache) => ({ ...prevCache, [searchQuery]: res.data.docs }));
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    }, 500), // 500ms debounce time
    [cache]
  );

  useEffect(() => {
    searchBooks(query);
  }, [query, searchBooks]);

  return (
    <div className="search-container">
      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by book name"
        />
        <button type="submit" onClick={() => searchBooks(query)}>Search</button>
      </form>
      {loading && <div>Loading...</div>}
      <div className="book-list">
        {books.map(book => (
          <BookCard key={book.key} book={book} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
};

export default BookSearch;
