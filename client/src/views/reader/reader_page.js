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
import "./reader.scss"

export default function ReaderPageView(props) {
    const [page, setPage] = useState(0);          // current page position
    const isMobile = window.orientation > -1;     // device type flag
    const [isPanel, setIsPanel] = useState(true); // contolls panel state flag

    let xPosDown;
    let isSwipe = false;

    const swipePage = (number) => {
        if ((number > 0) && (page !== props.pages.length - 1)) setPage(page + 1);
        else if ((number < 0) && (page !== 0)) setPage(page - 1);
    }

    const pageRotationWarning = () => {
        return (window.innerWidth < 300) && (isMobile);
    }

    const handlePageMove = (event) => {
        if (event.key === "ArrowRight") swipePage(1);
        else if (event.key === "ArrowLeft") swipePage(-1);
        console.log(1);
    }

    const handleUpPointer = (event) => {
        if (isMobile) {
            setIsPanel(!isPanel);
        }
        isSwipe = false;
        event.target.focus();
    }

    const extractPositionDelta = (event) => {
        let xPosDelta;
        if (Math.abs(xPosDelta = xPosDown - event.clientX) < 100) return 0;
        isSwipe = false;
        return xPosDelta;
    };

    const handleDownPointer = (event) => {
        event.preventDefault();
        
        xPosDown = event.clientX;
        isSwipe = true;

        event.target.setPointerCapture(event.pointerId);
    }

    const handleMovePointer = (event) => {
        if (isSwipe) {
            swipePage(extractPositionDelta(event));
        }
    }

    return (
        <div 
            onKeyDown={handlePageMove}
            tabIndex="0"
            className="contentContainer"
            onPointerDown={handleDownPointer}
            onPointerUp={handleUpPointer}
            onPointerMove={handleMovePointer}
        >

            {parse(props.pages[page])}
            {pageRotationWarning() && <Alert severity="info" >Place your device in a horizontal position.</Alert>}
        </div>
    );
}
