import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from "./Components/BookList";
import BookSearch from './Components/BookSearch'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
    state = {
        Books: []
    }

    componentDidMount() {
        this.getBooks()
    }

    getBooks = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({Books: books})
        })
    }

    update_books_details = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            this.getBooks()
        })
    }

    render() {
        return (
            <div className="app">
              <Route exact path="/" render={() => (<BookList books={this.state.Books} onChange={this.update_books_details}/>)}/>
              <Route exact path="/search" render={({history}) => (<BookSearch filterBooks={this.state.Books} onChange={this.update_books_details} />)}/>
            </div>
        )
    }
}

export default BooksApp
