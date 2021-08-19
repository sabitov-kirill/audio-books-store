import { useEffect, useState, useRef } from "react";
import BookView from "./book_view"

import {
    Container, Row, Col,
    NavDropdown, Nav,
    InputGroup, FormControl, Button
} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons'
//{props.isSearch
//    ? <Text>{props.searchKey}</Text>
//    <Button type='Submit'
//            onClick={() => {
//                ref.current.clear();
//                setSearch("");
//            }}
//            id="cancel-search-button">
//        <Search />
//    </Button>
//: ""}
export default function BooksListView(props) {
    useEffect(() => props.initBookStorage );
    const handleSelect = (eventKey, callback) => callback(eventKey);
    const [searchContent, setSearch] = useState("");
    const handleSearch = () => props.search(searchContent);
    const onSearchInput = (e) => {
        setSearch(e.target.value);
    };

    const searchRef = useRef();

    return (
        <Container>
            <InputGroup className="mb-3">
                <FormControl type="search"
                             placeholder="Search..."
                             onChange={onSearchInput}
                             ref={searchRef}/>
                <Button variant="outline-secondary"
                        type='Submit'
                        onClick={handleSearch}
                        id="search-button">
                    <Search />
                </Button>
            </InputGroup>
            <Nav inline="true">
                <NavDropdown title={`Sorted by: ${props.sortKey}`} id={"sort"}
                             onSelect={(eventKey) => handleSelect(eventKey, props.sorting)}>
                    <NavDropdown.Item
                        eventKey="New first"
                        active={props.sortKey === "New first"}>
                        New first
                    </NavDropdown.Item>
                    <NavDropdown.Item
                        eventKey="Old first"
                        active={props.sortKey === "Old first"}>
                        Old first
                    </NavDropdown.Item>
                    <NavDropdown.Item
                        eventKey="From A to Z"
                        active={props.sortKey === "From A to Z"}>
                        From A to Z
                    </NavDropdown.Item>
                    <NavDropdown.Item
                        eventKey="From Z to A"
                        active={props.sortKey === "From Z to A"}>
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