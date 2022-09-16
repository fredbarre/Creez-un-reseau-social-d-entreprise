import { Link } from "react-router-dom";
import {
  fetchdeletepost,
  fetchnewcomment,
  fetchpost,
  fetchposts,
  fetchsetlike,
} from "../providers/post";
import { getStorageUser, getStorageToken } from "../util/localstorageManager";

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

let user = getStorageUser();
let token = getStorageToken();
//console.log("allposts user token " + user + " " + token);
let posts = await fetchposts(token);
let final = [];

for (let i = 0; i < posts.length; i++) {
  final.push(
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
              <strong>{posts[i].user.name}</strong>
              <br />
              {posts[i].title}
              <br />
              {posts[i].post}
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
  );
}

function AllPosts() {
  return <section>{final}</section>;
}

export default AllPosts;
