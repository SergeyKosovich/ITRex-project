/* eslint-disable import/extensions */
import express from 'express';
import Controller from './patientControllers.js';
import checkToken from '../middleware/checkToken.js';

const controller = new Controller();
const router = express.Router();

router.post('/', checkToken, controller.addUser);
router.delete('/', controller.deleteFirstFromQueue);
router.get('/', controller.getFirstUserInQueue);
router.get('/queue', controller.getQueue);

export default router;
