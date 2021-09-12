/**
 *
 * CREATION DATE: 27.08.2021
 *
 * PROGRAMMER:    Daniel Konev.
 *
 * PURPOSE:       Audio books web store application.
 *                Reader page.
 *
 */

import { useEffect, useRef } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import ReaderPage from "../../controllers/reader/reader_page_controller";
import ReaderControl from "../../controllers/reader/reader_control_controller"

import './reader.scss';

export default function Reader(props) {
    const { bookId } = useParams();
    const book = props.books.find((book) => book.id === bookId);

    let flipBookRef = useRef();
    const flipNotify = props.flipNotify;
    const init = props.init;
    const onAudioCanPlay = props.autoPlay;    
    const onAudioEnd = props.autoNextPage;

    useEffect(() => {
        if (book) {
            init({ 
                bookId,
                pagesCount: book.pagesCount,
                onAudioCanPlay,
                onAudioEnd,
                flipBookRef,
            });

            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile && (window.innerHeight > window.innerWidth)) flipNotify();
        }
        return props.close;
    }, [bookId, book, flipNotify, init, onAudioCanPlay, onAudioEnd, props.close, flipBookRef]);

    if (!book) return <Redirect to='/' />
    if (props.isLoading) return <h1>Loading account data...</h1>
    if (!props.isLoggedIn) <Redirect to='/' />
    if (!props.ownedBooks.includes(bookId)) return <Redirect to='/' />

    return (
        <div className="reader">
            <ReaderPage ref={flipBookRef} />
            <ReaderControl />
        </div>
    );
}