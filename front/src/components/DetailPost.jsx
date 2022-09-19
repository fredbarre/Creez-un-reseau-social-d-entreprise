import { fetchpost } from "../providers/post.js";

function DetailPost() {
  let post = fetchpost();
  return (
    <div>
      <br />
      <img
        src={post.link}
        width="256"
        height="256"
        className="column is-half is-offset-one-quarter"
      />
      <div className="block box">{post.user}</div>
      <div className="block box">Titre du post {post.title}</div>
      <div className="block box">
        <br />
        {post.post}
      </div>
    </div>
  );
}

export default DetailPost;
