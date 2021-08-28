/**
 *
 * CREATION DATE: 19.08.2021
 *
 * PROGRAMMER:    Smirnov Daniil.
 *
 * PURPOSE:       Audio books web store application.
 *                Books list.
 *
 */

import { Container } from "@material-ui/core";

import BookView from "../../controllers/books/book_controller";
import './books_list.scss';

export default function BooksListView(props) {
    return (
        <Container maxWidth="md" className='booksList' >
            {props.books.length > 0
                ? props.books.map((book) => (
                        <BookView
                            isOwned={props.ownedBooks.includes(book.id)}
                            key={`todo-${book.id}`}
                            book={book}
                        />
                    ))
                : ""
            }
            {props.books.length > 0
                ? props.books.map((book) => (
                        <BookView
                            isOwned={props.ownedBooks.includes(book.id)}
                            key={`todo-${book.id}`}
                            book={book}
                        />
                    ))
                : ""
            }
            {props.books.length > 0
                ? props.books.map((book) => (
                        <BookView
                            isOwned={props.ownedBooks.includes(book.id)}
                            key={`todo-${book.id}`}
                            book={book}
                        />
                    ))
                : ""
            }
            {props.books.length > 0
                ? props.books.map((book) => (
                        <BookView
                            isOwned={props.ownedBooks.includes(book.id)}
                            key={`todo-${book.id}`}
                            book={book}
                        />
                    ))
                : ""
            }
            {props.books.length > 0
                ? props.books.map((book) => (
                        <BookView
                            isOwned={props.ownedBooks.includes(book.id)}
                            key={`todo-${book.id}`}
                            book={book}
                        />
                    ))
                : ""
            }
        </Container>
    );
};
