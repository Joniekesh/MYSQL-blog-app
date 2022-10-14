import "./singlePost.scss";
import CatListItem from "../../components/catListItem/CatListItem";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "timeago.js";
import DOMPurify from "dompurify";
import Loader from "../../components/loader/Loader";
import axiosInstance from "../../utils/axiosInstance";

const SinglePost = () => {
	const [post, setPost] = useState({});
	const [loading, setLoading] = useState(false);

	const { currentUser } = useContext(AuthContext);
	const user = currentUser?.user;
	const TOKEN = currentUser?.token;

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPost = async () => {
			setLoading(true);
			try {
				const res = await axiosInstance.get(`/posts/${id}`);
				setPost(res.data);
				setLoading(false);
			} catch (err) {
				toast.error(err.response.data, { theme: "colored" });
			}
		};
		fetchPost();
	}, [id]);

	const handleNavigate = () => {
		navigate(`/posts/${post.id}/edit`, { state: { post } });
	};

	const deletePost = async (id) => {
		const config = {
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			},
		};
		try {
			if (window.confirm("Are you sure? This cannot be UNDONE")) {
				await axiosInstance.delete(`/posts/${id}`, config);
				navigate("/");
				toast.success("Post deleted", { theme: "colored" });
			}
		} catch (err) {
			toast.error(err.response.data, { theme: "colored" });
		}
	};

	// const getText = (html) => {
	// 	const doc = new DOMParser().parseFromString(html, "text/html");
	// 	return doc.body.textContent;
	// };

	return (
		<div className="singlePost">
			<div className="siglePostLeft">
				{loading && <Loader />}
				<div className="postImg">
					<img src={post?.img} alt="" />
				</div>
				<div className="userInfo">
					<div className="userInfoLeft">
						<img src="/img/img2.jpeg" alt="" />
						<div className="userDetails">
							<span className="username">{post?.fullname}</span>
							<span className="postTime">Posted {format(post.created_at)}</span>
						</div>
					</div>
					{post?.fullname === user?.fullname && (
						<div className="userInfoRight">
							<span
								style={{ cursor: "pointer", color: "teal", fontSize: "20px" }}
								onClick={handleNavigate}
							>
								<AiFillEdit />
							</span>
							<span
								style={{
									cursor: "pointer",
									color: "crimson",
									fontSize: "20px",
								}}
								onClick={() => deletePost(post.id)}
							>
								<BsFillTrashFill />
							</span>
						</div>
					)}
				</div>
				<h2 className="postTitle">{post.title}</h2>
				<p
					className="postDescription"
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(post.desc),
					}}
				></p>
			</div>
			<div className="siglePostRight">
				<h3 style={{ color: "#09236d" }}>Other posts you may like</h3>
				<div className="list">
					<CatListItem cat={post.cat} />
				</div>
			</div>
		</div>
	);
};

export default SinglePost;
