import "./home.scss";
import { useEffect, useState } from "react";
import PostItem from "../../components/postItem/PostItem";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const cat = useLocation().search;
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			try {
				const res = await axiosInstance.get(`/posts${cat}`);
				setPosts(res.data);
				setLoading(false);
			} catch (err) {
				toast.error("No post for this category yet", { theme: "colored" });
				navigate("/");
			}
		};
		fetchPosts();
	}, [cat]);

	return (
		<div className="home">
			{loading ? (
				<Loader />
			) : (
				<div className="posts">
					{posts.map((post) => (
						<PostItem post={post} key={post.id} />
					))}
				</div>
			)}
		</div>
	);
};

export default Home;
