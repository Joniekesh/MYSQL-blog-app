import express from "express";
import {
	deleteUser,
	getUserById,
	getUsers,
	updateUser,
} from "../controllers/user.js";
const router = express.Router();

router.put("/me", updateUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/me", deleteUser);

export default router;
