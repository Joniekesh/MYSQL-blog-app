import "./write.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import axiosInstance from "../../utils/axiosInstance";

const Write = () => {
	const [value, setValue] = useState("");
	const [file, setFile] = useState(null);
	const [title, setTitle] = useState("");
	const [cat, setCat] = useState("");
	const [loading, setLoading] = useState(false);

	const { currentUser } = useContext(AuthContext);
	const TOKEN = currentUser?.token;

	const navigate = useNavigate();

	const createPost = async (e) => {
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

		setLoading(true);
		try {
			const uploadRes = await axiosInstance.post(
				"https://api.cloudinary.com/v1_1/joniekesh/image/upload",
				data
			);
			const { url } = uploadRes.data;

			const res = await axiosInstance.post(
				"/posts",
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
			toast.success("Post created", { theme: "colored" });
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="write">
			<div className="container">
				<h1 className="title">Create Post</h1>
				{loading && <Loader />}
				<form onSubmit={createPost}>
					<div className="formLeft">
						<div className="inputGroup">
							<label>Title</label>
							<input
								type="text"
								placeholder="Title"
								onChange={(e) => setTitle(e.target.value)}
								required
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
								<label
									htmlFor="file"
									style={{
										cursor: "pointer",
										color: "teal",
										fontWeight: "700",
									}}
								>
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
									Create
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

export default Write;
