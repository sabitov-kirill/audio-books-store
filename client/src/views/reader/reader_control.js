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
import { ArrowBack, PinDropSharp, PlayArrow, Stop } from '@material-ui/icons';

export default function ReaderPageView(props) {
    return (
        <div className="controlPanel" >
            <button><ArrowBack /></button>
            <button>{props.isPlaying ? <ArrowBack /> : }</button>
        </div>
    );
} 