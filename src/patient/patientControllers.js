import WebSocket from 'ws';
import bcrypt from 'bcryptjs';
import { WS_PORT } from '../config.js';
import { resolutionsStorageMethods, queueStorageMethods } from '../storageClasses/storageFactory.js';
import ApiError from '../errors/appError.js';
import generateToken from '../validatorSchemes/generateToken.js';

const ws = new WebSocket(`ws://localhost:${WS_PORT}`);

export default class Controller {
  deleteFirstAndReturnNewFirstFromQueue = async (req, res) => {
    await queueStorageMethods.removeFirstPatientInQue();
    const patient = await queueStorageMethods.checkFirstPatientInQueue();
    if (patient) {
      return res.status(200).json(patient);
    }
    return res.status(200).json('No patient');
  };

  getFirstUserInQueue = async (req, res, next) => {
    const patient = await queueStorageMethods.checkFirstPatientInQueue();
    try {
      if (patient) {
        res.status(200).json(patient);
        return;
      }
      throw new ApiError(404, 'No patient found');
    } catch (error) {
      next(error);
    }
  };

  addUser = async (req, res) => {
    await queueStorageMethods.addToque(req.body.name);
    ws.send(JSON.stringify({ name: req.body.name, event: 'addUser' }));
    res.status(200).send();
  };

  getQueue = async (req, res) => {
    const queue = await queueStorageMethods.returnQueue();
    res.status(200).json(queue);
  };

  authUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const response = await resolutionsStorageMethods.checkUserAndPassInDb(
        email,
      );
      if (!response) {
        throw new ApiError(401, 'incorrect login');
      }
      const validPassword = bcrypt.compareSync(password, response.password);
      if (!validPassword) {
        throw new ApiError(401, 'incorrect password');
      }
      const userData = await resolutionsStorageMethods.getUserData(
        response.user_id,
      );
      const token = generateToken(response.user_id);
      userData.dataValues.token = token;
      res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  };

  registerUser = async (req, res, next) => {
    const {
      email, password, firstName, lastName, gender, birthday,
    } = req.body;
    try {
      const response = await resolutionsStorageMethods.checkUserInDb(
        email,
        password,
      );
      if (response) {
        throw new ApiError(409, 'this email is already registered');
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const patientId = await resolutionsStorageMethods.createNewUser(
        email,
        hashPassword,
        firstName,
        lastName,
        gender,
        birthday,
      );
      res.status(201).json({ patient_id: patientId });
    } catch (e) {
      next(e);
    }
  };
}
