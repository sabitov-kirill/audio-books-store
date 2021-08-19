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

import { useEffect } from "react";
import BookView from "./book_view"

import {
    Row, Col
} from 'react-bootstrap';

export default function BooksListView(props) {
    useEffect(() => props.initBookStorage );

    return (
        <Row xs={2} sm={3} lg={4} xl={5} xxl={6}>
            <Col>
                {props.books.length !== 0
                    ? props.books.map((book) => {
                        return <BookView
                            key={`todo-${book.id}`}
                            book={book}
                            select={() => props.visitBookPage(book)}
                        />;
                    })
                    : ""}
            </Col>
        </Row>
    );
};