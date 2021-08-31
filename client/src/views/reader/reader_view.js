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

import { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import ReaderPage from "../../controllers/reader/reader_page_controller";
import ReaderControl from "../../controllers/reader/reader_control_controller"

import './reader.scss';

export default function Reader(props) {
    const { bookId } = useParams();
    const book = props.books.find((book) => book.id === bookId);

    const onAudioCanPlay = () => {
        props.autoPlay();
    }

    const onAudioEnd = () => {
        props.autoNextPage();
    }

    useEffect(() => {
        if (book) {
            props.init({ 
                bookId,
                pagesCount: book.pagesCount,
                onAudioCanPlay,
                onAudioEnd,
            });

            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile && (window.innerHeight > window.innerWidth)) props.flipNotify();
        }
        return props.close;
    }, []);

    if (!book) return <Redirect to='/' />
    if (props.isLoading) return <h1>Loading account data...</h1>
    if (!props.isLoggedIn) <Redirect to='/' />
    if (!props.ownedBooks.includes(bookId)) return <Redirect to='/' />

    return (
        <div className="reader">
            <ReaderPage />
            <ReaderControl />
        </div>
    );
}