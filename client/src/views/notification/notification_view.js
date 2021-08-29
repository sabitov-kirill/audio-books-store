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

import React, {Component, useEffect} from "react";
import { useSnackbar } from 'notistack';

function dispatch(code) {
    switch (code) {
        case 'offlineAuth':
            return {
                message: 'Для авторизации нужно подключение к интернету.',
                type: 'warning',
            };
        case 'test':
            return {
                message: 'Test',
                type: 'success',
            };
        default:
            return {
                message: 'Кто-то наклал...',
                type: 'cgsgForever',
            };
    }
}

export default function(props) {
    const id = props.id;
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const {message, type} = dispatch(props.notification);
        if (type !== 'cgsgForever') {
            const key = enqueueSnackbar(message,
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
    }, [props.id, props.code]);

    return (<></>);
}