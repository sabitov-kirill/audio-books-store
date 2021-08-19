import { useEffect, useState } from "react";

import {
    Container, Card, Row, Col,
    NavDropdown, Nav,
    InputGroup, FormControl, Button
} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons'

function BookView(props) {
    return (
        <Card onClick={props.select()}>
            <Card.Header>{props.book.title}</Card.Header>
            <Card.Img variant="top" src={props.book.imgPath} />
        </Card>
    );
}

export default function BooksListView(props) {
    useEffect(() => props.initBookStorage );
    const handleSelect = (eventKey, callback) => callback(eventKey);
    const [search, setSearch] = useState("");
    const onSearchInput = (e) => {
        setSearch(e.target.value);
    };

    return (
        <Container>
            <InputGroup className="mb-3">
                <FormControl type="text"
                             placeholder="Search..."
                             onChange={onSearchInput}/>
                <Button variant="outline-secondary"
                        type='Submit'
                        onClick={()=>{}}
                        id="search-button">
                    <Search />
                </Button>
            </InputGroup>
            <Nav inline="true">
                <NavDropdown title={`Sorted by: ${props.sort}`} id={"sort"}
                             onSelect={(eventKey) => handleSelect(eventKey, props.sorting)}>
                    <NavDropdown.Item
                        eventKey="New first"
                        active={props.sort === "New first"}
                    >
                        New first
                    </NavDropdown.Item>
                    <NavDropdown.Item
                        eventKey="Old first"
                        active={props.sort === "Old first"}
                    >
                        Old first
                    </NavDropdown.Item>
                    <NavDropdown.Item
                        eventKey="From A to Z"
                        active={props.sort === "From A to Z"}>
                        From A to Z
                    </NavDropdown.Item>
                    <NavDropdown.Item
                        eventKey="From Z to A"
                        active={props.sort === "From Z to A"}>
                        From Z to A
                    </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title={`Filters: ${props.filters}`} id={"filter"}
                             onSelect={(eventKey) => handleSelect(eventKey, props.filter)}>
                    <NavDropdown.Item
                        eventKey="All"
                        active={props.filters === "All"}>
                        All
                    </NavDropdown.Item>
                    <NavDropdown.Item
                        eventKey="Owned"
                        active={props.filters === "Owned"}>
                        Owned
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
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
        </Container>
    );
};