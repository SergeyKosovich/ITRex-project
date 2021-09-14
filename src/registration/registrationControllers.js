import bcrypt from "bcryptjs";
import { resolutionsStorageMethods } from "../storageClasses/storageFactory.js";
import ApiError from "../errors/appError.js";
import prepareName from "../utils/prepareName.js";

export default class Controller {
  registerUser = async (req, res, next) => {
    const { email, password, firstName, lastName, gender, birthday } = req.body;

    const name = prepareName(`${firstName} ${lastName}`);
    try {
      const response = await resolutionsStorageMethods.checkUserAndPassInDb(
        email,
        password
      );
      if (response) {
        throw new ApiError(409, "this email is already registered");
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const patientId = await resolutionsStorageMethods.createNewUserAndPatient(
        email,
        hashPassword,
        name,
        gender,
        birthday
      );
      res.status(201).json({ patient_id: patientId });
    } catch (e) {
      next(e);
    }
  };
}
