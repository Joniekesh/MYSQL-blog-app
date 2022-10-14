import axios from "axios";
import { useEffect, useState } from "react";
import "./catListItem.scss";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import axiosInstance from "../../utils/axiosInstance";

const CatListItem = ({ cat }) => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchCats = async () => {
			setLoading(true);
			try {
				const res = await axiosInstance.get(`/posts?cat=${cat}`);
				setPosts(res.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchCats();
	}, [cat]);

	return (
		<div className="posts">
			{loading ? (
				<Loader />
			) : (
				posts.length > 0 &&
				posts.map((post) => (
					<div className="catListItem" key={post.id}>
						{post.img && <img src={post.img} alt="" />}
						<h3 className="postTitle">{post.title}</h3>
						<Link to={`/posts/${post.id}`}>
							<button>Read more</button>
						</Link>
					</div>
				))
			)}
		</div>
	);
};

export default CatListItem;
