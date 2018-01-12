import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'

class BookSearch extends Component {
  state = {
    booksState: [],
    query: ''
  }

  static propTypes = {
      filterBooks: PropTypes.array.isRequired,
      onChange: PropTypes.func.isRequired
  }

  handleChange = (e) => {
    var val = e.target.value
    this.setState(() => {
      return {query: val}
    })
    this.booksearch(val)
  }

  booksearch = (val) => {
    if (val.length !== 0) {
      BooksAPI.search(val, 20).then((books) => {
        if(books.error) {
            this.setState(() => {
                return {booksState: []}
            })
        }
        else {
          books = books.filter((book) => (book.imageLinks))
          books = this.updateBookShelf(books)
          this.setState(() => {
            return {booksState: books}
          })
        }
      })
    } else {
      this.setState({
          query: '',
          booksState: []})
    }
  }

  addBook = (book, shelf) => {
        this.props.onChange(book, shelf)
  }

  updateBookShelf = (books) => {
        let availableBooks = this.props.filterBooks
        for (let book of books) {
            for (let b of availableBooks) {
                if (book.id === b.id) {
                    book.shelf = b.shelf
                } else {
                    book.shelf = 'none'
                }
            }
        }
        return books
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
            {this.state.query.length > 0 && this.state.booksState.map((book, index) => (<Book key={book.id} book={book} onUpdate={(shelf) => {
              this.addBook(book, shelf)
            }}/>))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch;
