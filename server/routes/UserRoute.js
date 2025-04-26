import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import { homePage, createUser, updateUser, deleteUser, findId} from "../controllers/UserController.js";

const router = express.Router();

router.get("/", homePage)
router.post("/signup", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", findId);



export default router;