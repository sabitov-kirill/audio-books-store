/**
 *
 * CREATION DATE: 19.08.2021
 *
 * PROGRAMMER:    Smirnov Daniil.
 *
 * PURPOSE:       Audio books web store application.
 *                Book sorting and filters navigation.
 *
 */

import { Nav, NavDropdown } from "react-bootstrap";

export default function SortNFilterForm(props) {
    const handleSelect = (eventKey, callback) => callback(eventKey);

    return (
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
    );
}