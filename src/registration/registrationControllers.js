import bcrypt from 'bcryptjs';
import { resolutionsStorageMethods } from '../storageClasses/storageFactory.js';
import ApiError from '../errors/appError.js';
import UsersStorage from '../storageClasses/usersStorage.js';

const userMethods = new UsersStorage();

export default class Controller {
  registerUser = async (req, res, next) => {
    const {
      email, password, firstName, lastName, gender, birthday,
    } = req.body;
    try {
      const response = await userMethods.getUserPasswordAndId(email, password);
      if (response) {
        throw new ApiError(409, 'this email is already registered');
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const userData = await userMethods.createNewUser(email, hashPassword);
      const patient = await resolutionsStorageMethods.createNewPatient(
        userData.user_id,
        firstName,
        lastName,
        gender,
        birthday,
      );
      res.status(201).json({ patient_id: patient.patient_id });
    } catch (e) {
      next(e);
    }
  };
}
