import express from 'express';
import Controller from './registrationControllers.js';

const controller = new Controller();
const router = express.Router();

router.post('/', controller.registerUser);

export default router;
