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
import {Close} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import './notification.css'

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

export default function(props) {
    const id = props.id;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const action = key => (
        <IconButton
            className="defColor"
            size="small"
            aria-label="closeNotification"
            onClick={() => { closeSnackbar(key) }}>
            <Close />
        </IconButton>
    );

    useEffect(() => {
        const {message, type} = dispatch(props.notification);
        if (type !== 'cgsgForever') {
            const key = enqueueSnackbar(message,
                {
                    action,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center'
                    },
                    autoHideDuration: type === "success" ? 3000 : 8500,
                    disableWindowBlurListener: true,
                    preventDuplicate: true,
                    variant: type,
                });
        }
    }, [props.id, props.code]);

    return (<></>);
}