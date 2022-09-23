import { useState, useContext } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchdeletepost,
  fetchnewcomment,
  fetchpost,
  fetchposts,
  fetchsetlike,
  fetchdeletecomment,
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

/*
async function submitDetails(postId) {
  let user = getStorageUser();
  let token = getStorageToken();

  await fetchpost(postId);
}*/
function AllPosts({ uptime }) {
  const { user, setUser, account, setAccount, token2, setToken } =
    useContext(UserContext);
  console.log("allpost ");
  console.log(user);
  console.log(account);
  console.log(token2);
  let userId = getStorageUser();
  let accountId = getStorageAccount();
  let token = getStorageToken();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async function () {
      setPosts(await fetchposts({ accountId, userId }, token));
    })();
  }, [uptime]);
  //console.log("allposts user token " + user + " " + token);
  //let posts = fetchposts();
  async function submitComment(commentTextid, postId) {
    let comment = document.getElementById(commentTextid).value;
    console.log("cmt" + comment);
    await fetchnewcomment(
      { userId, accountId, postId, comment },
      postId,
      token
    );
  }

  async function submitdeleteComment(commentId) {
    await fetchdeletecomment(
      { accountId, userId, commentId },
      commentId,
      token
    );
  }

  async function submitDeletePost(postId) {
    await fetchdeletepost({ accountId, userId, postId }, postId, token);
  }

  return (
    <section>
      {posts.map((post) => (
        <div className="box column is-three-fifths is-offset-one-fifth">
          <article className="media">
            <button
              className="delete"
              onClick={function () {
                submitDeletePost(post._id);
              }}
            ></button>
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
                  <a className="level-item" aria-label="reply">
                    <span className="icon is-small">
                      <i className="fas fa-reply" aria-hidden="true"></i>
                    </span>
                  </a>
                  <Link className="level-item" aria-label="reply" to="/post">
                    <i className="fa-solid fa-circle-info"></i>
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
          {post.comments.map((comment) => (
            <article className="media">
              <button
                className="delete"
                onClick={function () {
                  submitdeleteComment(comment._id);
                }}
              ></button>
              <figure className="media-left">
                <p className="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{comment.user.name} </strong>
                    <br />
                    {comment.comment}

                    <br />
                  </p>
                </div>
              </div>
            </article>
          ))}

          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
              </p>
            </figure>
            <div className="media-content">
              <div className="field">
                <p className="control">
                  <textarea
                    className="textarea"
                    id={"commentText" + post._id}
                    placeholder="Ajouter un commentaire..."
                  ></textarea>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button
                    className="button"
                    onClick={function () {
                      submitComment("commentText" + post._id, post._id);
                    }}
                  >
                    Poster un commentaire
                  </button>
                </p>
              </div>
            </div>
          </article>
        </div>
      ))}
    </section>
  );
}

export default AllPosts;
