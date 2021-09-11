import express from "express";
import Controller from "./docControllers.js";
import Validator from "../validator/validator.js";

const controller = new Controller();
const validator = new Validator();
const router = express.Router();

router.patch("/", validator.checkResolution, controller.patchResolution);
router.get("/", validator.checkQueryName, controller.getResolutions);
router.delete("/", controller.deleteRes);

export default router;
