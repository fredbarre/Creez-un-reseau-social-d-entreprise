import { useState, useContext } from "react";
import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
  getStorageRole,
  getStorageAvatarLink,
} from "../util/localstorageManager";
import { UserContext } from "../contexts/UserContext";
import { useUpdate } from "../contexts/Update";
import { checkPreferences } from "joi";

/*
async function submitDetails(postId) {
  let user = getStorageUser();
  let token = getStorageToken();

  await fetchpost(postId);
}*/
function AllPosts({ uptime }) {
  let {
    user,
    setUser,
    account,
    setAccount,
    role,
    setRole,
    token,
    setToken,
    connected,
    setConnected,
  } = useContext(UserContext);

  console.log("allpost ");
  console.log(user);
  console.log(account);
  console.log(token);
  console.log(connected);
  let userId = user; //getStorageUser();
  let accountId = account; //getStorageAccount();
  //token = getStorageToken();
  //let role = getStorageRole();
  let avatarLink = getStorageAvatarLink();
  console.log("avatarLink allposts", avatarLink);
  const { update } = useUpdate();
  const { lastUpdate } = useUpdate();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async function () {
      setPosts(await fetchposts(token));
    })();
  }, [uptime, lastUpdate]);

  console.log("uptime", uptime);

  async function submitComment(commentTextid, postId) {
    let comment = document.getElementById(commentTextid).value;
    console.log("cmt" + comment);
    let result = await fetchnewcomment({ comment }, postId, token);
    let message = result.message;
    if (message) {
      alert(message);
    } else {
      update();
    }
  }

  async function submitdeleteComment(commentId, userId) {
    console.log("submitdeletecomment");
    console.log(commentId);
    console.log(userId);
    await fetchdeletecomment({ userId }, commentId, token);
    update();
  }
  //supprime le post avec l'id postId et utilise l'userId de l'auteur du post pour l'autorisation
  async function submitDeletePost(postId, userId) {
    await fetchdeletepost({ userId }, postId, token);
    update();
  }

  async function submitLike(postId) {
    await fetchsetlike(postId, token);
    update();
  }
  function refresh() {
    update();
  }

  return (
    <section>
      <a className="level-item" aria-label="like">
        <i className="fa-solid fa-arrows-rotate bigfont" onClick={refresh}></i>
      </a>
      <br />

      {posts.map((post) => (
        <div
          key={post._id}
          className="box column is-three-fifths is-offset-one-fifth"
        >
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img
                  src={
                    post.user.avatarLink
                      ? post.user.avatarLink
                      : "\\src\\assets\\placeholder.jpg"
                  }
                  alt="Image"
                />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{post.user.name}</strong>
                  {post.link != "" ? (
                    <img
                      src={`\\${post.link}`}
                      width="256"
                      height="256"
                      className="column is-11"
                    />
                  ) : null}
                  <br />
                  {post.title}
                  <br />
                  {post.post}
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  {/*
                  <a className="level-item" aria-label="reply">
                    
                    <span className="icon is-small">
                      <i className="fas fa-reply" aria-hidden="true"></i>
                    </span>
                  </a>
                  
                  <Link
                    className="level-item"
                    aria-label="reply"
                    to={"/post/" + post._id}
                  >
                    <i className="fa-solid fa-circle-info"></i>
                  </Link>
                  */}
                  <a className="level-item" aria-label="like">
                    <span className="icon is-small">
                      <i
                        className="fas fa-heart"
                        aria-hidden="true"
                        onClick={function () {
                          submitLike(post._id);
                        }}
                        style={{
                          color:
                            post.userLiked.indexOf(userId) != -1 ? "red" : null,
                        }}
                      ></i>
                    </span>
                  </a>

                  {post.user._id == userId || role.includes("admin") ? (
                    <Link
                      className="level-item"
                      aria-label="reply"
                      to={"/newpost/" + post._id}
                    >
                      <i className="fa-solid fa-file-pen"></i>
                    </Link>
                  ) : null}

                  {post.user._id == userId || role.includes("admin") ? (
                    <a className="level-item" aria-label="like">
                      <span className="icon is-small">
                        <i
                          className="fa-solid fa-circle-xmark has-text-danger"
                          onClick={function () {
                            submitDeletePost(post._id, post.user._id);
                          }}
                        ></i>
                      </span>
                    </a>
                  ) : null}
                  {console.log(post.user)}
                  {console.log(userId)}
                </div>
              </nav>
            </div>
          </article>
          {post.comments
            .slice(0)
            .reverse()
            .map((comment) => (
              <article key={comment._id} className="media">
                <figure className="media-left">
                  <p className="image is-48x48">
                    <img
                      src={
                        comment.user.avatarLink
                          ? comment.user.avatarLink
                          : "\\src\\assets\\placeholder.jpg"
                      }
                    />
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
                    <nav className="level is-mobile">
                      <div className="level-left margin-left">
                        {comment.user._id == userId ||
                        role.includes("admin") ? (
                          <Link
                            className="level-item"
                            aria-label="reply"
                            to={"/comment/" + comment._id}
                          >
                            <i class="fa-solid fa-file-pen"></i>
                          </Link>
                        ) : null}
                        {comment.user._id == userId ||
                        role.includes("admin") ? (
                          <a className="level-item" aria-label="like">
                            <i
                              className="fa-solid fa-circle-xmark has-text-danger"
                              onClick={function () {
                                submitdeleteComment(
                                  comment._id,
                                  comment.user._id
                                );
                              }}
                            ></i>
                          </a>
                        ) : null}
                      </div>
                    </nav>
                  </div>
                </div>
              </article>
            ))}

          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img
                  src={
                    avatarLink ? avatarLink : "\\src\\assets\\placeholder.jpg"
                  }
                />
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
