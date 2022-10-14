import "./postEdit.scss";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const PostEdit = () => {
	const {
		state: { post },
	} = useLocation();

	const [value, setValue] = useState(post.desc);
	const [file, setFile] = useState(post.img);
	const [title, setTitle] = useState(post.title);
	const [cat, setCat] = useState(post.cat);

	const { currentUser } = useContext(AuthContext);
	const TOKEN = currentUser?.token;

	const navigate = useNavigate();

	const updatePost = async (e) => {
		e.preventDefault();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${TOKEN}`,
			},
		};

		const data = new FormData();
		data.append("file", file);
		data.append("upload_preset", "upload");

		try {
			const uploadRes = await axiosInstance.post(
				"https://api.cloudinary.com/v1_1/joniekesh/image/upload",
				data
			);
			const { url } = uploadRes.data;

			const res = await axiosInstance.put(
				`/posts/${post.id}`,
				{
					title,
					desc: value,
					img: url,
					cat,
					uid: currentUser.user.id,
				},
				config
			);
			navigate("/");
			toast.success("Post updated", { theme: "colored" });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="write">
			<div className="container">
				<h1 className="title">Update Post</h1>
				<form onSubmit={updatePost}>
					<div className="formLeft">
						<img src={file} alt="" />
						<div className="inputGroup">
							<label>Title</label>
							<input
								type="text"
								placeholder="Title"
								onChange={(e) => setTitle(e.target.value)}
								required
								value={title}
							/>
						</div>
						<div className="inputGroupDesc">
							<label>Description</label>
							<ReactQuill theme="snow" value={value} onChange={setValue} />
						</div>
					</div>
					<div className="formRight">
						<div className="top">
							<h2>Publish</h2>
							<span>Status: Draft</span>
							<span>Visibility: Public</span>
							<div>
								<label htmlFor="file" style={{ cursor: "pointer" }}>
									Upload Image
								</label>
								<input
									type="file"
									id="file"
									style={{ display: "none" }}
									onChange={(event) => setFile(event.target.files[0])}
									required
								/>
							</div>
							<div className="buttonDiv">
								<button className="saveBtn">Save as draft</button>
								<button type="submit" className="updateBtn">
									Update
								</button>
							</div>
						</div>
						<div className="bottom">
							<h2>Category</h2>
							<div className="radiogroup">
								<label>Sports</label>
								<input
									type="radio"
									name="cat"
									id="sports"
									value="sports"
									checked={cat === "sports"}
									onChange={(event) => setCat(event.target.value)}
								/>
							</div>
							<div className="radiogroup">
								<label>Entertainment</label>
								<input
									type="radio"
									name="cat"
									id="entertainment"
									value="entertainment"
									checked={cat === "entertainment"}
									onChange={(event) => setCat(event.target.value)}
								/>
							</div>
							<div className="radiogroup">
								<label>Technology</label>
								<input
									type="radio"
									name="cat"
									id="technology"
									value="technology"
									checked={cat === "technology"}
									onChange={(event) => setCat(event.target.value)}
								/>
							</div>
							<div className="radiogroup">
								<label>Education</label>
								<input
									type="radio"
									name="cat"
									id="education"
									value="education"
									checked={cat === "education"}
									onChange={(event) => setCat(event.target.value)}
								/>
							</div>
							<div className="radiogroup">
								<label>Science</label>
								<input
									type="radio"
									name="cat"
									id="science"
									value="science"
									checked={cat === "science"}
									onChange={(event) => setCat(event.target.value)}
								/>
							</div>
							<div className="radiogroup">
								<label>Art</label>
								<input
									type="radio"
									name="cat"
									id="art"
									value="art"
									checked={cat === "art"}
									onChange={(event) => setCat(event.target.value)}
								/>
							</div>
							<div className="radiogroup">
								<label>Food</label>
								<input
									type="radio"
									name="cat"
									id="food"
									value="food"
									checked={cat === "food"}
									onChange={(event) => setCat(event.target.value)}
								/>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PostEdit;
