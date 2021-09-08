import express from 'express';
import Controller from './registrationControllers.js';

const controller = new Controller();
const router = express.Router();

router.patch('/', controller.registerUser);

export default router;
