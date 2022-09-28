import { fetchpost } from "../providers/post.js";
import { getStorageToken } from "../util/localstorageManager.js";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function DetailPost({ uptime }) {
  const { id } = useParams();
  console.log("detailPost id=" + id);
  let token = getStorageToken();

  const [post, setPost] = useState([]);
  useEffect(() => {
    (async function () {
      setPost([await fetchpost(id, token)]);
    })();
  }, [uptime]);

  console.log(post);
  let link;
  let user;
  let textpost;
  let title;
  if (post[0]) {
    link = post[0].link;
    user = post[0].user.name;
    textpost = post[0].post;
    title = post[0].title;
  } else {
    link = "";
    user = "";
    textpost = "";
    title = "";
  }
  console.log("tp=", textpost);
  return (
    <div>
      <br />
      {link != "" ? (
        <img
          src={link}
          width="256"
          height="256"
          className="column is-half is-offset-one-quarter"
        />
      ) : null}
      <div className="block box">{user}</div>
      <div className="block box">{title}</div>
      <div className="block box">
        <br />
        {textpost}
      </div>
    </div>
  );
}

export default DetailPost;
