/* eslint-disable import/extensions */
import express from "express";
import staffController from "./staffController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/doctor/:id", checkAuth, staffController.getDoctor);

export default router;
