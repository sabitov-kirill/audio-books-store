/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Daniel Konev.
 *
 * PURPOSE:       Audio books web store application.
 *                Reader page.
 *
 */

import { useState } from "react";
import parse from "html-react-parser";

export default function ReaderPageView(props) {
    const [page, setPage] = useState(0);

    const handlePageMove = (event) => {
        if (event.key === "ArrowRight" && page < props.pages.length - 1) {
            setPage((page) => page + 1);
            console.log(event.key, page);
        }
        else if (event.key === "ArrowLeft" && page > 0) {
            setPage((page) => page - 1);
            console.log(event.key, page);
        }
    }

    console.log(`page: ${page}`);
    return (
        <div onKeyUp={handlePageMove} onClick={handlePageMove} tabIndex="0">
            {parse(props.pages[page])}
        </div>
    );
}
