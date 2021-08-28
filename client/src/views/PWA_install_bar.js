import React, {Fragment, useEffect, useState} from "react";
import {IconButton, Snackbar} from "@material-ui/core";
import {Close, GetApp} from "@material-ui/icons";

let deferredPrompt;

export default function InstallPWA() {
    const [installable, setInstallable] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
            // Update UI notify the user they can install the PWA
            setInstallable(true);
            setOpen(true);

            console.log("Can be installed");
        });

        window.addEventListener('appinstalled', () => {
            // Log install to analytics
            console.log('INSTALL: Success');
        });
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;

        setOpen(false);
    };

    const handleInstallClick = (e) => {
        // Hide the app provided install promotion
        setInstallable(false);
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
        });
    };

    return (
        <Snackbar
            className="installbar"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open && installable}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Вы можете установить наше приложение, что бы использовать оффлайн!"
            action={
                <Fragment>
                    <IconButton
                        className="instl"
                        size="small"
                        aria-label="install"
                        onClick={() => {
                            handleInstallClick();
                            handleClose('install', 'success');
                        }}>Установить
                        <GetApp />
                    </IconButton>
                    <IconButton
                        size="small"
                        aria-label="close"
                        onClick={() => {
                            handleClose('close', 'later');
                        }}>
                        <Close />
                    </IconButton>
                </Fragment>
            }
        />
    );
}