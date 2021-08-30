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
import { useEffect, useState } from "react";

import BookView from "../../controllers/books/book_controller";
import './books_list.scss';

export default function BooksListView(props) {
    const [booksArray, setBooksArray] = useState(props.books);
    useEffect(() => {
        setBooksArray(
            booksArray.concat().sort((book1, book2) => {
                const isBook1Owned = props.ownedBooks.includes(book1.id);
                const isBook2Owned = props.ownedBooks.includes(book2.id);

                return Number(isBook2Owned) - Number(isBook1Owned);
            })
        );
    }, [props.books, props.ownedBooks])

    return (
        <Container maxWidth="md" className='booksList' >
            {props.books.length > 0
                ? booksArray.map((book) => (
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
