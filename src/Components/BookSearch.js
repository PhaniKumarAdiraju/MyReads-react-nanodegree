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
        onChange: PropTypes.func.isRequired,
    }

    handleChange = (e) => {
        var value = e.target.value
        this.setState(() => {
            return {query: value}
        })
        this.booksearch(value)
    }

    booksearch = (val) => {
        if (val.length !== 0) {
            BooksAPI.search(val, 10).then((books) => {
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
            this.setState({booksState: [], query: ''})
        }
    }

    add_book = (book, shelf) => {
        this.props.onChange(book, shelf)
    }

    updateBookShelf = (books) => {
        let availableBooks = this.props.filterBooks
        for (let book of books) {
            book.shelf = "none"
        }

        for (let book of books) {
            for (let b of availableBooks) {
                if (b.id === book.id) {
                    book.shelf = b.shelf
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
                        {this.state.query.length > 0 && this.state.booksState.map((book, index) => (<Book book={book} key={book.id} onUpdate={(shelf) => {
                            this.add_book(book, shelf)
                        }}/>))}
                    </ol>
                </div>
            </div>
        )
    }
}


export default BookSearch;
