import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import BookSearch from './components/BookSearch';
import Bookshelf from './components/Bookshelf';
import './styles.css';

const App = () => {
  const [bookshelf, setBookshelf] = useState(() => {
    const savedBooks = localStorage.getItem('bookshelf');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const addBookToBookshelf = (book) => {
    const updatedBookshelf = [...bookshelf, book];
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <Router>
      <Header />
      <Routes>
         <Route path="/" element={<BookSearch onAdd={addBookToBookshelf} />} />
        <Route path="/bookshelf" element={<Bookshelf books={bookshelf} />} />
      </Routes>
    </Router>
  );
};

export default App;
