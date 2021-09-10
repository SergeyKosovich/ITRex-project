import express from 'express';
import Controller from './docControllers.js';
import Validator from '../middleware/validator.js';
import checkToken from '../middleware/checkToken.js';

const controller = new Controller();
const validator = new Validator();
const router = express.Router();

router.patch('/', validator.checkResolution, controller.patchResolution);
router.get('/', checkToken, validator.checkId, controller.getById);
router.delete('/', controller.deleteRes);

export default router;
