import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const Bookshelf = (props) => {

    const update_book = (book, shelf) => {
        props.onChangeShelf(book, shelf)
    }
    const books = props.books
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book, index) => (
                        <Book book={book} key={book.id} onUpdate={
                            (shelf) => {update_book(book,shelf)}
                        }/>
                    ))}
                </ol>
            </div>
        </div>
    )
}

Bookshelf.propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}

export default Bookshelf