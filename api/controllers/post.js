import { db } from "../config/db.js";
import jwt from "jsonwebtoken";

// Create Post
export const createPost = (req, res) => {
	const token = req.headers.authorization.split(" ")[1];

	if (!token) return res.status(401).json("No token. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		const q =
			"INSERT INTO posts(`title`, `desc`, `img`, `cat`, `uid`) VALUES (?)";

		const values = [
			req.body.title,
			req.body.desc,
			req.body.img,
			req.body.cat,
			userInfo.id,
		];

		db.query(q, [values], (err, post) => {
			if (err) return res.status(500).json(err);

			return res.status(201).json(post[0]);
		});
	});
};

// Get all posts
export const getPosts = (req, res) => {
	const q = req.query.cat
		? "SELECT * FROM posts WHERE cat=?"
		: "SELECT * FROM posts";

	db.query(q, [req.query.cat], (err, posts) => {
		if (err) return res.status(500).json(err);

		if (!posts[0]) return res.status(404).json("Posts not found");

		res.status(200).json(posts);
	});
};

// Get a post by ID
export const getPost = (req, res) => {
	const q =
		"SELECT p.id, `fullname`, `title`, `desc`, p.img, u.img AS userImg, `cat`, p.created_at, p.updated_at FROM users u JOIN posts p ON u.id = p.uid WHERE p.id=?";

	db.query(q, [req.params.id], (err, post) => {
		if (err) return res.status(500).json(err);

		if (!post[0]) return res.status(404).json("Post not found");

		res.status(200).json(post[0]);
	});
};

export const updatePost = (req, res) => {
	const token = req.headers.authorization.split(" ")[1];

	if (!token) return res.status(401).json("No token. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		const postId = req.params.id;

		const postQuery = "SELECT * FROM posts WHERE id=?";
		db.query(postQuery, [postId], (err, singlePost) => {
			if (err) return res.status(500).json(err);

			if (!singlePost[0]) return res.status(404).json("Post not found");

			if (singlePost[0].uid !== userInfo.id) {
				return res.status(401).json("You can only update your own post");
			}

			const q =
				"UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id`=? AND `uid`=?";

			const values = [
				req.body.title || singlePost[0].title,
				req.body.desc || singlePost[0].desc,
				req.body.img || singlePost[0].img,
				req.body.cat || singlePost[0].cat,
			];

			db.query(q, [...values, postId, userInfo.id], (err, post) => {
				if (err) return res.status(500).json(err);

				return res.status(200).json(post[0]);
			});
		});
	});
};

export const deletePost = (req, res) => {
	const token = req.headers.authorization.split(" ")[1];

	if (!token) return res.status(401).json("No token. Authorization denied.");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		const postId = req.params.id;

		const postQuery = "SELECT * FROM posts WHERE id=?";
		db.query(postQuery, [postId], (err, singlePost) => {
			if (err) return res.status(500).json(err);

			if (singlePost.length === 0)
				return res.status(404).json("Post not found");

			if (singlePost[0].uid !== userInfo.id)
				return res.status(401).json("You can delete only your post");

			const q = "DELETE FROM posts WHERE id=? AND uid=?";
			db.query(q, [req.params.id, userInfo.id], (err, data) => {
				if (err) return res.status(500).json(err);

				return res.status(200).json("Post deleted");
			});
		});
	});
};
