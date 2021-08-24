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

 import BookView from "../../controllers/books/book_controller"

import {
    Row, Col
} from 'react-bootstrap';

export default function BooksListView(props) {
    return (
        <Row xs={1}
             className='d-flex justify-content-center'>
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
        </Row>
    );
};
