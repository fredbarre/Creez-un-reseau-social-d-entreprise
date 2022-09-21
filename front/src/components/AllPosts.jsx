import { useState, useContext } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchdeletepost,
  fetchnewcomment,
  fetchpost,
  fetchposts,
  fetchsetlike,
} from "../providers/post";
import {
  getStorageUser,
  getStorageToken,
  getStorageAccount,
} from "../util/localstorageManager";
import { UserContext } from "../util/UserContext";

async function submitLike(postId) {
  let user = getStorageUser();
  let token = getStorageToken();

  await fetchsetlike({ userId: user }, postId, token);
}
async function submitDeletePost(postId) {
  let user = getStorageUser();
  let token = getStorageToken();

  await fetchdeletepost({ userId: user }, postId, token);
}

async function submitCommment(postId) {
  let user = getStorageUser();
  let token = getStorageToken();

  await fetchnewcomment({ userId: user }, postId, token);
}
/*
async function submitDetails(postId) {
  let user = getStorageUser();
  let token = getStorageToken();

  await fetchpost(postId);
}*/
function AllPosts({ uptime }) {
  const { user, setUser, account, setAccount, token, setToken } =
    useContext(UserContext);
  console.log("allpost ");
  console.log(user);
  console.log(account);
  console.log(token);
  let userId = getStorageUser();
  let accountId = getStorageAccount();
  let token2 = getStorageToken();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async function () {
      setPosts(await fetchposts({ accountId, userId }, token2));
    })();
  }, [uptime]);
  //console.log("allposts user token " + user + " " + token);
  //let posts = fetchposts();

  return (
    <section>
      {posts.map((post) => (
        <div className="box column is-three-fifths is-offset-one-fifth">
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img
                  src="https://bulma.io/images/placeholders/128x128.png"
                  alt="Image"
                />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{post.user.name}</strong>
                  <br />
                  {post.title}
                  <br />
                  {post.post}
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <Link className="level-item" aria-label="reply" to="/post">
                    Details
                  </Link>

                  <a className="level-item" aria-label="like">
                    <span className="icon is-small">
                      <i className="fas fa-heart" aria-hidden="true"></i>
                    </span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div>
      ))}
    </section>
  );
}

export default AllPosts;
