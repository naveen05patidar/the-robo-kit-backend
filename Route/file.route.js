const express = require('express');
const { videoUpload } = require('../APIRouter.js');

const FileRouter = express.Router();

FileRouter.route('/upload').post(videoUpload)

module.exports = FileRouter;