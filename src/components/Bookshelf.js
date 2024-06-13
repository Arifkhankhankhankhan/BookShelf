import React from 'react';
import PropTypes from 'prop-types';

const Bookshelf = ({ books }) => (
  <div className="bookshelf">
    <h2>My Bookshelf</h2>
    <div className="book-list">
      {books.length > 0 ? (
        books.map(book => (
          <div key={book.key} className="book-card">
            <h3>{book.title}</h3>
            <p>Edition Count: {book.edition_count}</p>
          </div>
        ))
      ) : (
        <p>Your bookshelf is empty</p>
      )}
    </div>
  </div>
);

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
};

Bookshelf.defaultProps = {
  books: [],
};

export default Bookshelf;
