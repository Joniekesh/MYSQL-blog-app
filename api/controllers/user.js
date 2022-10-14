import { db } from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Update user
export const updateUser = (req, res) => {
	const token = req.headers.authorization.split(" ")[1];

	if (!token) return res.status(401).json("No token! Authorization denied");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		const userId = userInfo.id;

		const userQuery = "SELECT * FROM users WHERE id=?";
		db.query(userQuery, [userId], (err, user) => {
			if (err) return res.status(500).json(err);

			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(req.body.password, salt);

			const q =
				"UPDATE users SET `fullname`=?, `email`=?, `img`=?, `password`=? WHERE `id`=?";

			const values = [
				req.body.fullname || user[0].fullname,
				req.body.email || user[0].email,
				req.body.img || user[0].img,
				hash || user[0].password,
			];

			db.query(q, [...values, userId], (err, updatedUser) => {
				if (err) return res.status(500).json(err);

				return res.status(200).json(updatedUser[0]);
			});
		});
	});
};

// Get all users
export const getUsers = (req, res) => {
	const token = req.headers.authorization.split(" ")[1];

	if (!token) return res.status(401).json("No token! Authorization denied.");

	const q = "SELECT id,fullname, email,img FROM users";
	db.query(q, (err, users) => {
		if (err) return res.status(500).json(err);

		if (users.length === 0) return res.status(404).json("Users not found");

		res.status(200).json(users);
	});
};

// Get user by ID
export const getUserById = (req, res) => {
	const token = req.headers.authorization.split(" ")[1];

	if (!token) return res.status(401).json("No token! Authorization denied.");

	const q = "SELECT id fullname, email,img FROM users WHERE id=?";
	db.query(q, [req.params.id], (err, user) => {
		if (err) return res.status(500).json(err);

		if (user.length === 0) return res.status(404).json("User not found");

		res.status(200).json(user[0]);
	});
};

export const deleteUser = (req, res) => {
	const token = req.headers.authorization.split(" ")[1];

	if (!token) return res.status(401).json("No token! Authorization denied.");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		const userId = userInfo.id;

		const q = "DELETE FROM users WHERE id=?";
		db.query(q, [userId], (err, user) => {
			if (err) return res.status(500).json(err);

			return res.status(200).json("User deleted");
		});
	});
};
