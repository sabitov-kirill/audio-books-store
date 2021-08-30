/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import {NavigationRoute, registerRoute} from 'workbox-routing';
import {NetworkFirst, NetworkOnly, StaleWhileRevalidate, CacheFirst} from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response'  
import {BackgroundSyncPlugin} from "workbox-background-sync";

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const handler = createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html');
registerRoute(new NavigationRoute(handler));

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.

//Кэшируем google шрифты
registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com',
    new StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

// Кэшируем изображения
registerRoute(
    // проверяем, что цель запроса - изображение
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        // помещаем файлы в кэш с названием 'images'
        cacheName: 'images',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200]
            }),
            // кэшируем до 50 изображений в течение 30 дней
            new ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new BackgroundSyncPlugin('imageQueue', {
                maxRetentionTime: 10 // Retry for max of 10 minutes (specified in minutes)
            }),
        ]
    })
)

// Кэшируем запросы на получение `CSS`, `JS` и веб-воркеров
registerRoute(
    ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
    new CacheFirst({
        // помещаем файлы в кэш с названием 'images'
        cacheName: 'assets',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200]
            }),
            new BackgroundSyncPlugin('assetsQueue', {
                maxRetentionTime: 10 // Retry for max of 10 minutes (specified in minutes)
            }),
        ]
    })
)

const connectionSyncPlugin = new BackgroundSyncPlugin('userConnectionQueue', {
    maxRetentionTime: 10 // Retry for max of 10 minutes (specified in minutes)
});

// Регистрация или вход
    registerRoute(
    ({ url }) =>
        url.pathname.startsWith('/api/user/access') ||
        url.pathname.startsWith('/api/user/create') ||
        url.pathname.startsWith('/api/user/leave'),
    new NetworkOnly({
        plugins: [
            connectionSyncPlugin
        ]
    })
)

//Переподключение
registerRoute(
    ({ url }) =>
        url.pathname.startsWith('/api/user/reaccess'),
    new StaleWhileRevalidate({
        cacheName: 'user',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200]
            }),
            new ExpirationPlugin({
                maxEntries: 1
            }),
            connectionSyncPlugin
        ]
    })
)

const bookCardsSyncPlugin = new BackgroundSyncPlugin('bookCardsQueue', {
    maxRetentionTime: 60 // Retry for max of 60 minutes (specified in minutes)
});

//Загрухка карточек книг
registerRoute(
    ({ url }) =>
        url.pathname.startsWith('/api/books/cards'),
    new StaleWhileRevalidate({
        cacheName: 'bookCards',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200]
            }),
            bookCardsSyncPlugin
        ]
    })
)

const booksContentSyncPlugin = new BackgroundSyncPlugin('booksContentQueue', {
    maxRetentionTime: 60 // Retry for max of 60 minutes (specified in minutes)
});

//Загрухка контента книг
registerRoute(
    ({ url }) =>
        url.pathname.startsWith('/books'),
    new CacheFirst({
        cacheName: 'booksContent',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200]
            }),
            booksContentSyncPlugin
        ]
    })
)