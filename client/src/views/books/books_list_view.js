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

import BookView from "../../controllers/books/books_controller"

import {
    Row, Col
} from 'react-bootstrap';

export default function BooksListView(props) {
    return (
        <Row xs={2} sm={3} lg={4} xl={5} xxl={6}>
            <Col>
                {props.books.length !== 0
                    ? props.books.map((book) => {
                        return <BookView
                            key={`todo-${book.id}`}
                            book={book} />;
                    })
                    : ""}
            </Col>
        </Row>
    );
};