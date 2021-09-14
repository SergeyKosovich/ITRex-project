/* eslint-disable import/extensions */
import express from "express";
import staffController from "./staffController.js";

const router = express.Router();

router.get("/doctor", staffController.getDoctor);

export default router;
