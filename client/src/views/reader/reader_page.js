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


// abstract
// This component should have wrapper, which gives it in props all book data.
// So this view doesn't have controller, cause any global logic connected with this page wrapper.
// This needs for simplifying code.

import { useState } from "react";
import Alert from '@material-ui/lab/Alert'
import parse from "html-react-parser"

export default function ReaderPageView(props) {
    const [page, setPage] = useState(0);

    const handlePageMove = (event) => {
        if (event.key === "ArrowRight" && page !== props.pages.length) setPage(page + 1);
        else if (event.key === "ArrowLeft" && page !== 0) setPage(page - 1);
        console.log(event.key, props.pages.length === page);
    }

    const pageRotationWarning = () => {
        return (window.innerWidth < 300) && (window.orientation > -1);
    }

    return (
        <div onKeyDown={handlePageMove} onClick={handlePageMove} tabIndex="0">
            {parse(props.pages[page])}
            {pageRotationWarning() && <Alert severity="info" >Place your device in a horizontal position.</Alert>}
        </div>
    );
}
