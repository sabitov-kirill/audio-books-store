import { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

export default function SearchBarForm(props) {
    const [searchContent, setSearch] = useState("");
    const handleSearch = () => props.search(searchContent);
    const onSearchInput = (e) => {
        setSearch(e.target.value);
    };

    return (
        <InputGroup className='mb-1 d-flex justify-content-center'>
            <FormControl 
                type="search"
                placeholder="Search..."
                onChange={onSearchInput}
            />
            <Button 
                variant="outline-success"
                type='submit'
                onClick={handleSearch}
                id="search-button"
            >
                <Search />
            </Button>
        </InputGroup>
    );
}