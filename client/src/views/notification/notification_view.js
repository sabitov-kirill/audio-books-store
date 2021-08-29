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
        case 'offlineAuth':
            return {
                message: 'Для авторизации нужно подключение к интернету.',
                type: 'info',
            };
        case 'test':
            return {
                message: 'Test',
                type: 'success',
            };
        case 'flip':
            return {
                message: 'Пожалуйста, переверните девайс. Так читать будет удобнее.',
                type: 'info',
            };
        default:
            return {
                message: 'Кто-то наклал...',
                type: 'cgsgForever',
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
        this.id = 0;
    }

    componentDidUpdate() {
        const {message, type} = dispatch(this.props.notification);
        this.id = this.props.id;
        if (type !== 'cgsgForever') {
            this.key = this.props.enqueueSnackbar(message,
                {
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center'
                    },
                    autoHideDuration: 2500,
                    disableWindowBlurListener: true,
                    preventDuplicate: true,
                    variant: type,
                });
        }
    }

    render() {
        console.log(this.props.notification);
        return (<></>);
    };
}

export default withSnackbar(NotificationView);