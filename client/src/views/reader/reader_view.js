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
    const initSelf = props.init;
    const isLoading = props.isAudioLoading;
    const { bookId } = useParams();
    const book = props.books.find((book) => book.id === bookId)

    useEffect(() => {
        if (book) {
            initSelf({ bookId: bookId, pagesCount: book.pagesCount });
            props.flipNotify();
        }
        return props.close;
    }, []);
    useEffect(() => {
        if (isLoading) {
            props.audio.addEventListener('canplay', () => {
                if (props.audioStatus !== 'paused') {
                    props.setSuccessAudioLoad();
                    props.playAudio();
                } else {
                    props.setSuccessAudioLoad();
                }
            });

            props.audio.addEventListener('ended', () => {
                props.nextPage();
            });
        }
    }, [isLoading]);

    if (!book) return <Redirect to='/' />
    if (props.isLoading) return <h1>Loading account data...</h1>
    if (!props.ownedBooks.includes(bookId)) return <Redirect to='/' />

    return (
        <div className="reader">
            <ReaderControl />
            <ReaderPage />
        </div>
    );
}