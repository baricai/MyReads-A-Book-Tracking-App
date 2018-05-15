import React from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends React.Component {

  state = {
    books: []
  }

  updateQuery(query) {
    if (query === '') {
      this.setState({ books: [] })

      return
    }

    BooksAPI.search(query).then((result) => {
      console.log(result);
      if (result.error) {
        this.setState({ books: [] })
      } else {
        this.setState({ books: result })
        books.sort(sortBy('title'))
      }
    })
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => (
              <li key={book.id}>
                <Book book={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
