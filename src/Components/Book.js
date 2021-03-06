import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    constructor(props) {
        super();
        this.state = {shelf: props.book.shelf ? props.book.shelf : "none"}
    }

    static propTypes = {
        book: PropTypes.object.isRequired,
        onUpdate: PropTypes.func.isRequired,
    }

    update_bookShelf = (e) => {
        this.props.onUpdate(e.target.value)
    }
    render(){
        const book = this.props.book
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            backgroundImage: `url("${book.imageLinks.thumbnail}")`
                        }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={this.update_bookShelf} value={book.shelf ? book.shelf : "none"}>
                                <option disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
                </div>
            </li>
        )
    }
}

export default Book