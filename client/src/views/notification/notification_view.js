/**
 *
 * CREATION DATE: 28.08.2021
 *
 * PROGRAMMER:    Smirnov Daniil.
 *
 * PURPOSE:       Audio books web store application.
 *                Notification snackbar.
 *
 */

import React, {Component} from "react";
import { withSnackbar } from 'notistack';

function dispatch(code) {
    switch (code) {
        case 'test':
            return {
                message: 'Test',
                type: 'success',
            };
        default:
            return {
                message: 'Kto-to naklal...',
                type: 'none',
            };
    }
}

class NotificationView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        }
        this.key = 0;
    }
    handleNotify = () => {
        const {message, type} = dispatch(this.props.notification)
        if (type !== 'none') {
            this.key = this.props.enqueueSnackbar(message,
                {
                    variant: type,
                    preventDuplicate: true,
                    disableWindowBlurListener: true,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center'
                    },
                });
        }
    };

    render() {
        this.handleNotify()
        return (<></>);
    };
}

export default withSnackbar(NotificationView);