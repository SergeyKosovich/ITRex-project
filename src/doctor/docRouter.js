import express from "express";
import Controller from "./docControllers.js";
import Validator from "../validator/validator.js";
import checkAuth from "../middleware/checkAuth.js";

const controller = new Controller();
const validator = new Validator();
const router = express.Router();

router.use("/", checkAuth);
router.patch("/", validator.checkResolution, controller.patchResolution);
router.get("/", validator.checkId, controller.getById);
router.delete("/", controller.deleteRes);

export default router;
