/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Daniel Konev.
 *
 * PURPOSE:       Audio books web store application.
 *                Reader control panel.
 *
 */

import { useHistory } from 'react-router-dom';
import { 
    ArrowBack, PlayArrow,
    Pause, Close, FastRewind,
    Fullscreen, FullscreenExit, MenuOpen
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { useState } from 'react';

export default function ReaderControl(props) {
    const history = useHistory();
    const [isVisible, setIsVisible] = useState(true);

    const elem = document.documentElement;
    const [fullscreen, setFullscreen] = useState(false);

    const openFullscreen = () =>  {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
          elem.msRequestFullscreen();
        }

        setFullscreen(true);
    }
      
    /* Close fullscreen */
    const closeFullscreen = () =>  {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
          document.msExitFullscreen();
        }

        setFullscreen(false);
    }

    const redirectHome = () =>  {
        if (fullscreen) closeFullscreen();
        history.push("/");
    }

    const FullscreenButton = () => {
        if (fullscreen) {
            return (
                <IconButton onClick={closeFullscreen}>
                    <FullscreenExit />
                </IconButton>
            );
        }
        return (
            <IconButton onClick={openFullscreen}>
                <Fullscreen />
            </IconButton>
        );
    }
    
    const AudioButton = () => {
        if (props.isAudioPaused) {
            return (
                <IconButton onClick={props.playAudio}>
                    <PlayArrow />
                </IconButton>
            );
        }
        return (
            <IconButton onClick={props.pauseAudio} >
                <Pause />
            </IconButton>
        );
    }
    
    const BackButton = () => 
        <IconButton onClick={redirectHome}>
            <ArrowBack />
        </IconButton>;

    const PagesCount = () =>
        <p>??????. {Number(props.page) + 1}/{props.pagesCount}</p>    
    
    const ControlButton = () =>
        <IconButton onClick={() => setIsVisible(false)} className='closeButton'>
            <Close />
        </IconButton>;

    const StartPage = () =>
        <IconButton onClick={props.startPage} className='startPageButton' >
            <FastRewind />
        </IconButton>

    const controlPanel = 
        <div className="controlPanel fogged" >
            <BackButton />
            <FullscreenButton />
            <PagesCount />
            <StartPage />
            <AudioButton />
            <ControlButton />
        </div>;

    const showControlPanel = 
        <div className="showControlPanel fogged" >
            <IconButton onClick={() => setIsVisible(true)} className='startPageButton' >
                <MenuOpen />
            </IconButton>
        </div>;

    return (
        <>
            {isVisible && controlPanel}
            {!isVisible && showControlPanel}
        </>
    );
} 