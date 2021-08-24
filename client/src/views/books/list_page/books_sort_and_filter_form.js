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

import React, { Fragment } from "react";
import { NavDropdown } from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead';
import './button.css'

function FilterBar(props) {
    const handleInputChange = (selectedOptions) => {
        props.filter(selectedOptions);
    };

    return (
        <Typeahead
            className='d-flex justify-content-center'
            id="filter-bar"
            multiple
            options={props.options}
            onInputChange={handleInputChange}
            placeholder="Choose filters..."
        />
    );
}

function SortingBar(props) {
    const handleSelect = (eventKey) => props.sorting(eventKey);

    return (
        <NavDropdown
            className='d-flex justify-content-left'
            title={`Sorted by: ${props.sortKey}`}
            id={"sort"}
            onSelect={(eventKey) => handleSelect(eventKey)}
        >
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
    );
}

export default function SortNFilterForm(props) {
    return (
        <Fragment>
            <FilterBar 
                filter={props.filter}
                options={props.options}
            />
            <SortingBar
                sortKey={props.sortKey}
                sorting={props.sorting}
            />
        </Fragment>
    );
}