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
import { ArrowBack, PlayArrow, Stop, Close, AspectRatio } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { useState } from 'react';

export default function ReaderControl(props) {
    const history = useHistory();

    const elem = document.documentElement;
    const [fullscreen, setFullscreen] = useState(false);

    function openFullscreen() {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
          elem.msRequestFullscreen();
        }
    }
      
    /* Close fullscreen */
    function closeFullscreen() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
          document.msExitFullscreen();
        }
    }

    const fullscreenButton = () => {
        if (fullscreen) {
            return (
                <IconButton onClick={() => {
                    setFullscreen(false);
                    closeFullscreen();
                }}>
                    <AspectRatio />
                </IconButton>
            );
        }
        return (
            <IconButton onClick={() => {
                setFullscreen(true);
                openFullscreen();
            }}>
                <AspectRatio />
            </IconButton>
        );
    }
    
    const audioButton = () => {
        if (props.audioStatus === "paused") {
            return (
                <IconButton onClick={() => {
                    props.playAudio();
                    if (props.page === 0) {
                        props.switchControlPanel();
                        props.nextPage();
                    }
                }}>
                    <PlayArrow />
                </IconButton>                
            );
        } else if (props.audioStatus === "playing") {
            return (
                <IconButton onClick={props.pauseAudio} >
                    <Stop />
                </IconButton>
            );
        }
    }

    const backButton = <IconButton onClick={() => {
        props.pauseAudio();
        if (fullscreen) closeFullscreen();
        history.push("/");
    }}>
                           <ArrowBack />
                       </IconButton>;
    
    const controlButton = <IconButton onClick={props.switchControlPanel}>
                              <Close />
                          </IconButton>;

    const controlPanel = <div className="controlPanel" >
                             {backButton}
                             {fullscreenButton()}
                             {audioButton()}
                             {controlButton}
                         </div>;

    return (
        <>
            {props.isControlPanel && controlPanel}
        </>
    );
} 