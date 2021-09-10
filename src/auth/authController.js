import bcrypt from 'bcryptjs';
import { resolutionsStorageMethods } from '../storageClasses/storageFactory.js';
import ApiError from '../errors/appError.js';
import generateToken from '../middleware/generateToken.js';
import UsersStorage from '../storageClasses/usersStorage.js';

const userMethods = new UsersStorage();

export default class Controller {
  authUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const response = await userMethods.getUserPasswordAndId(
        email,
      );
      if (!response) {
        throw new ApiError(401, 'incorrect login');
      }
      const validPassword = bcrypt.compareSync(password, response.password);
      if (!validPassword) {
        throw new ApiError(401, 'incorrect password');
      }
      const userData = await resolutionsStorageMethods.getPatientData(
        response.user_id,
      );
      const token = generateToken(response.user_id, response.email);
      userData.dataValues.token = token;
      res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  };
}
