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

import { useRef, useEffect, useState } from "react";

export default function ReaderPageView(props) {
    const pageContainer = useRef(null);
    useEffect(() => {
        pageContainer.current.focus();
    }, []);

    const handlePageMove = (event) => {
        if      (event.key === "ArrowRight") props.nextPage();
        else if (event.key === "ArrowLeft")  props.prevPage();        
    }

    const [xDown, setXDown] = useState(null);
    const [xDiff, setXDiff] = useState(0);
    const epsilon = 50;
    const handleTouchStart = (evt) => {
        if (evt.touches !== undefined) setXDown(evt.touches[0].clientX);
        else setXDown(evt.clientX);
    };                                                
                                                                               
    const handleTouchMove = (evt) => {
        if (!xDown) {
            return;
        }
 
        let xMove;
        if (evt.touches !== undefined) {
            xMove = evt.touches[0].clientX;
        } else {
            xMove = evt.clientX;
        }
        setXDiff(xDown - xMove);
        if (Math.abs(xDiff) > epsilon) {
            if      (xDiff > 0) props.nextPage();
            else if (xDiff < 0) props.prevPage();

            setXDown(null);
        }                
    };

    const handleTouchEnd = () => {
        if (Math.abs(xDiff) < 5) {
            props.switchControlPanel();
        }

        setXDown(null);
        setXDiff(0);
    }

    return (
        <div 
            className="page"
            tabIndex='0'
            ref={pageContainer}            
            style={{backgroundImage: `url(${props.imageUrl})`}}

            onKeyUp={handlePageMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
        />
    );
}