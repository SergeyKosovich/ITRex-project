/* eslint-disable import/extensions */
import express from "express";
import Controller from "./patientControllers.js";
import Validator from "../validator/validator.js";

const controller = new Controller();
const validator = new Validator();
const router = express.Router();

// router.post("/", validator.checkToken, validator.checkId, controller.addUser);
// router.get("/queue", controller.getQueue);
router.post("/", validator.checkId, controller.addUser);
router.delete("/", controller.deleteFirstAndReturnNewFirstFromQueue);
router.get("/", controller.getFirstUserInQueue);

export default router;
