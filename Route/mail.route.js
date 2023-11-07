const express = require('express');
const Router = express.Router();
const sendMail = require('../sendMail.js');
const {loginFunction} = require('../APIRouter.js');

Router.route('/mail').post(sendMail);

Router.route('/login').post(loginFunction);

module.exports = Router;