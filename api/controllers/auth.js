import { db } from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
	const q = "SELECT * FROM `users` WHERE email= ?";

	db.query(q, [req.body.email], (err, user) => {
		if (err) return res.status(500).json(err);

		if (user.length)
			return res
				.status(409)
				.json(`A user with an email ${user[0].email}  already exists!`);

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);

		const q = "INSERT INTO users(`fullname`, `email`, `password`) VALUES (?)";

		const values = [req.body.fullname, req.body.email, hash];

		db.query(q, [values], (err, user) => {
			if (err) return res.status(500).json(err);

			return res.status(201).json(user[0]);
		});
	});
};

export const login = (req, res) => {
	const q = "SELECT * FROM users WHERE email=?";

	db.query(q, [req.body.email], (err, user) => {
		if (err) return res.status(500).json(err);

		if (!user[0]) return res.status(400).json("Invalid Credentials");

		const isMatch = bcrypt.compareSync(req.body.password, user[0].password);

		if (!isMatch) return res.status(400).json("Invalid Credential");

		const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET);
		const { password, ...other } = user[0];

		return res.status(200).json({ user: other, token });
	});
};
