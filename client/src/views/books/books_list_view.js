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

export default function BooksListView(props) {
    return (
        <section className='container py-4'>
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
        </section>
    );
};
