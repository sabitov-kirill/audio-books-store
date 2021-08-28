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

import './reader.scss';

export default function ReaderPageView() {
    const [page, setPage] = useState(0);

    const handlePageMove = (event) => {
        if (event.key === "ArrowRight" && page < 14) {
            setPage((page) => page + 1);
            console.log(event.key, page);
        }
        else if (event.key === "ArrowLeft" && page > 0) {
            setPage((page) => page - 1);
            console.log(event.key, page);
        }
    }

    return (
        <div onKeyUp={handlePageMove} tabIndex="0" className="reader">
            <div className="page" ></div>
        </div>
    );
}
