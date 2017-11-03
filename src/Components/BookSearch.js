import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'

class BookSearch extends Component {
  state = {
    Books: [],
    query: ''
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    filterBooks: PropTypes.array.isRequired
  }

  handleChange = (e) => {
    var val = e.target.value
    this.setState(() => {
      return {query: val}
    })
    this.search_books(val)
  }

  updateBookShelf = (books) => {
    let availableBooks = this.props.filterBooks
    for (let book of books) {
      for (let b of availableBooks) {
        if (b.id === book.id) {
          book.shelf = b.shelf
        }
      }
    }
    return books
  }

  search_books = (val) => {
    if (val.length !== 0) {
      BooksAPI.search(val, 20).then((books) => {
        if (books.length > 0) {
          books = books.filter((book) => (book.imageLinks))
          books = this.updateBookShelf(books)
          this.setState(() => {
            return {Books: books}
          })
        }
      })
    } else {
      this.setState({Books: [], query: ''})
    }
  }

  add_book = (book, shelf) => {
    this.props.onChange(book, shelf)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.query.length > 0 && this.state.Books.map((book, index) => (<Book book={book} key={index} onUpdate={(shelf) => {
              this.add_book(book, shelf)
            }}/>))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch;
