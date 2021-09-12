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

import { useState, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";

const ReaderPageView = forwardRef((props, ref) => {
    const pageElement = (pageNumber) => (
        <div className="pageConent" >
            <img src={`${props.bookUrl}/page_${pageNumber}.png`} alt={`page ${pageNumber} image`}/>
            <div
                className={pageNumber % 2 === 0 ? "pageImageLeftShadow" : "pageImageRightShadow"}
            ></div>
        </div>
    );
    let pagesImages = [];
    for (let pageNumber = 0; pageNumber < props.pagesCount; pageNumber++) {    
        pagesImages.push(pageElement(pageNumber * 2));
        pagesImages.push(pageElement(pageNumber * 2 + 1));
    }

    const [flipBookPage, setFlipBookPage] = useState(props.page * 2);
    const onFlip = ({ data: newFlipBookPage }) => {
        if      (newFlipBookPage === flipBookPage + 2) props.nextPage();
        else if (newFlipBookPage === flipBookPage - 2) props.prevPage();
        setFlipBookPage(newFlipBookPage);
    }

    const onInit = () => {
        ref.current.pageFlip().turnToPage(props.page * 2);
    }

    return (
        <div className="page">
            <HTMLFlipBook
                width={960}
                height={960}
                size="stretch"
                minWidth={160}
                maxWidth={1920}
                minHeight={160}
                maxHeight={1920}
                maxShadowOpacity={0.5}
                usePortrait={false}
                onFlip={onFlip}
                onInit={onInit}
                ref={ref}
            >
                {pagesImages}
             </HTMLFlipBook>
        </div>
    );
});

export default ReaderPageView;