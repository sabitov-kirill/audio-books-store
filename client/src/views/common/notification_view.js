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

import React, {useEffect} from "react";
import { useSnackbar } from 'notistack';
import {Close} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import './notification.css'

function dispatch(code) {
    switch (code) {
        case 'offlineLogout':
            return {
                message: 'Для выхода из аккаунта нужно подключение к интернету.',
                type: 'warning',
            };
        case 'offlineAuth':
            return {
                message: 'Для авторизации нужно подключение к интернету.',
                type: 'warning',
            };
        case 'offlineBuy':
            return {
                message: 'Для покупки книги нужно подключение к интернету.',
                type: 'warning',
            };
        
        case 'flip':
            return {
                message: 'Пожалуйста, переверните девайс. Так читать будет удобнее.',
                type: 'info',
            };

        case 'buyPending':
            return {
                message: 'Вскоре вы будете перенаправлены на страницу покупки. После оплаты книга автоматически станет доступна для чтения.',
                type: 'info',
            };
        case 'buySuccess':
            return {
                message: 'Книга успешно куплена.',
                type: 'success',
            };
        case 'buyError':
            return {
                message: 'При покупке книги произошла ошибка.',
                type: 'error',
            };

        default:
            return {
                message: 'Кто-то наклал...',
                type: 'cgsgForever',
            };
    }
}

export default function NotificationView(props) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        const action = key => (
            <IconButton
                className="defColor"
                size="small"
                aria-label="closeNotification"
                onClick={() => { closeSnackbar(key) }}>
                <Close />
            </IconButton>
        );
        const { message, type } = dispatch(props.notification);

        if (type !== 'cgsgForever') {
            enqueueSnackbar(message,
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
    }, [props.id, props.code, props.notification, enqueueSnackbar, closeSnackbar]);

    return (<></>);
}