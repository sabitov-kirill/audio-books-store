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

import { useRef, useEffect } from "react";

export default function ReaderPageView(props) {
    let isSwipe = false;
    let xPosDown;
    const epsilon = 50;

    const pageContainer = useRef(null);
    useEffect(() => {
        pageContainer.current.focus();
    }, []);

    const handlePageMove = (event) => {
        if      (event.key === "ArrowRight") props.nextPage();
        else if (event.key === "ArrowLeft")  props.prevPage();        
    }

    const handlePointerUp = (event) => {
        if (isSwipe) {
            props.switchControlPanel();
        }
        isSwipe = false;
        event.target.focus();
    }

    const extractPositionDelta = (event) => {
        let xPosDelta;
        if (Math.abs(xPosDelta = xPosDown - event.clientX) < epsilon) return 0;
        return xPosDelta;
    };

    const handlePointerDown = (event) => {
        event.preventDefault();
        
        xPosDown = event.clientX;
        isSwipe = true;

        event.target.setPointerCapture(event.pointerId);
    }

    const handlePointerMove = (event) => {
        let toSwipe;
        if (isSwipe) {
            if      ((toSwipe = extractPositionDelta(event)) > 0) props.nextPage();
            else if (toSwipe < 0)                                 props.prevPage();

        }
    }

    return (
        <div 
            className="page"
            tabIndex='0'
            onKeyUp={handlePageMove}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            ref={pageContainer}            
            style={{backgroundImage: `url(${props.imageUrl})`}}
        />
    );
}
