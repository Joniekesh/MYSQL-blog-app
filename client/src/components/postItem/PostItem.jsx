import "./postItem.scss";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
	const getText = (html) => {
		const doc = new DOMParser().parseFromString(html, "text/html");
		return doc.body.textContent;
	};

	return (
		<div className="postItem">
			<div className="postItemLeft">
				<h1 className="postTitle">{post.title}</h1>
				<p className="postDescription">{getText(post.desc.slice(0, 200))}...</p>
				<Link to={`/posts/${post.id}`}>
					<button>Read more</button>
				</Link>
			</div>
			<div className="postItemRight">
				{post.img && <img src={post.img} alt="" />}
			</div>
		</div>
	);
};

export default PostItem;
