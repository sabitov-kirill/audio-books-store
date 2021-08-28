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

export default function ReaderPageView(props) {

    const handlePageMove = (event) => {
        console.log('flex');
        if      (event.key === "ArrowRight") props.nextPage();
        else if (event.key === "ArrowLeft") props.prevPage();
    }

    return (
        <div 
            onKeyUp={handlePageMove}
            className="page"
            tabIndex='0'
            style={{backgroundImage: `url(${props.imageUrl})`}}
        />
    );
}
