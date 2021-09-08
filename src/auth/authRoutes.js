/* eslint-disable import/extensions */
import express from 'express';
import Controller from './authController.js';

const controller = new Controller();
const router = express.Router();

router.post('/', controller.authUser);

export default router;
