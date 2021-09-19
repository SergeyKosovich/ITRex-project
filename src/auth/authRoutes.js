/* eslint-disable import/extensions */
import express from 'express';
import Controller from './authController.js';
import Validator from '../validator/validator.js';

const validator = new Validator();
const controller = new Controller();
const router = express.Router();

router.use(validator.checkCredentialBody);
router.post('/', controller.authUser);
router.post('/doctor', controller.authDoctor);

export default router;
