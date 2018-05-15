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

  updateShelf = (book, shelf) => {
    this.setState(state => ({
      books: state.books.map((b) => {
        if (b.id === book.id) {
          b.shelf = shelf
        }

        return b
      })
    }))

    BooksAPI.update(book, shelf).then((response) => {

    })
  }

  addBook = (book) => {
    console.log(book);
    this.setState(state => ({
      books: state.books.concat([ book ])
    }))
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <ListBooks
            books={books}
            onUpdateShelf={this.updateShelf}
          />
        )}/>

        <Route exact path="/search" render={() => (
          <SearchBooks
            currentBooks={books}
            onUpdateShelf={this.updateShelf}
            addBook={this.addBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
