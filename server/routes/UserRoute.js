import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import { createUser, signInUsers, updateUser, deleteUser, userList} from "../controllers/UserController.js";

const router = express.Router();

router.get("/userlist", userList)
router.post("/signin", signInUsers);
router.post("/signup", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;