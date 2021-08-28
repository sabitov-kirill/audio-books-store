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

import { useEffect } from "react";
import ReaderPage from "../../controllers/reader/reader_page_controller";

import './reader.scss';

export default function Reader(props) {
    const initSelf = props.init;
    useEffect(() => {
        initSelf({ bookUrl: 'books/Eamneaequebonorum', pageCount: 15 })
    }, [initSelf]);
    useEffect(() => {
        if (props.isAudioLoading) {
            props.audio.addEventListener('canplay', () => {
                if (props.audioStatus !== 'paused') {
                    props.setSuccessAudioLoad();
                    props.playAudio();
                } else {
                    props.setSuccessAudioLoad();
                }
            })
        }
    }, [props.isAudioLoading]);

    return (
        <div className="reader">
            <ReaderPage />
        </div>
    );
}