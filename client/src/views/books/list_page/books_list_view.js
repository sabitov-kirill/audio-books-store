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

import BookView from "../../../controllers/books/book_controller"

export default function BooksListView(props) {
    return (
        <div>
        {props.books.length > 0
            ? props.books.map((book) => (
                    <BookView
                        key={`todo-${book.id}`}
                        book={book}
                    />
                ))
            : ""
        }
        </div>
    );
};
