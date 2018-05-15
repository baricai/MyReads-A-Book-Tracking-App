import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.map((b) => {
        if (b.id === book.id) {
          b.shelf = shelf
        }

        return b
      })
    }))

    BooksAPI.update(book, shelf).then((response) => {
      // console.log(response);
    })
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onUpdateShelf={this.updateBook}
          />
        )}/>

        <Route exact path="/search" render={() => (
          <SearchBooks
            currentBooks={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
