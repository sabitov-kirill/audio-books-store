import Card from 'react-bootstrap/Card';

function BookView(props) {
    return (
        <Card onClick={props.select()}>
            <Card.Header>{props.book.title}</Card.Header>
            <Card.Img variant="top" src={props.book.imgPath} />
        </Card>
    );
}

export default function BooksListView(props) {
    console.log(props);
    return (
        <section>
            {props.books.length > 0
                ? props.books.map((book) => {
                    return <BookView
                        key={`todo-${book.id}`}
                        book={book}
                        select={() => props.visitBookPage(book)} />;
                })
                : "No more books"}
        </section>
    );
};