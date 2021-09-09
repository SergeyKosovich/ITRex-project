/* eslint-disable import/extensions */
import express from "express";
import Controller from "./patientControllers.js";
import Validator from "../validator/validator.js";
import checkAuth from "../middleware/checkAuth.js";

const controller = new Controller();
const validator = new Validator();
const router = express.Router();

router.post("/", validator.checkToken, validator.checkId, controller.addUser);
router.delete("/", checkAuth, controller.deleteFirstAndReturnNewFirstFromQueue);
router.get("/", controller.getFirstUserInQueue);
router.get("/queue", controller.getQueue);

export default router;
