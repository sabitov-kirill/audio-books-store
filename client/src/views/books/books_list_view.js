import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
        <Container>
            <Row xs={2} sm={3} lg={4} xl={5} xxl={6}>
                <Col>
                    {props.books.length > 0
                        ? props.books.map((book) => {
                            return <BookView
                                key={`todo-${book.id}`}
                                book={book}
                                select={() => props.visitBookPage(book)} />;
                        })
                        : ""}
                </Col>
            </Row>
        </Container>
    );
};