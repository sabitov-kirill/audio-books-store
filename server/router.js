/**
 *
 * CREATION DATE: 17.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                Server requests router handle module.
 *
 */

const Router = require('express').Router;

const authController = require('./controllers/auth_controller');
const bookController = require('./controllers/book_controller');

const router = new Router();

// User interaction requests
router.post('/user/registration', authController.registration);
router.post('/user/login',        authController.login);
router.post('/user/logout',       authController.logout);

// Book interation requests
router.post('api/book/getAll',       bookController.getBooks);
router.post('api/book/getBook',      bookController.getBook);

module.exports = router;