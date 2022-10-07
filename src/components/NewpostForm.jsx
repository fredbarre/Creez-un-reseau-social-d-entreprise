import {
  fetchnewpost,
  fetchsendimage,
  fetchupdatepost,
} from "../providers/post";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getStorageUser,
  getStorageToken,
  getStorageAccount,
} from "../util/localstorageManager";
import { UserContext } from "../contexts/UserContext";
import { fetchsendavatar } from "../providers/user";

function NewpostForm() {
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
  let navigate = useNavigate();
  const { id } = useParams();
  console.log("newpostparams", id);
  async function submitNewPost() {
    let postTitle = document.getElementById("postTitle").value;
    let postText = document.getElementById("postText").value;
    let accountId = account; //getStorageAccount();
    //let token = getStorageToken();
    let userId = user; // getStorageUser();

    let file = document.getElementById("file").files[0];
    let filename = document.getElementById("file").value;
    let message = undefined;

    if (!id) {
      let post = await fetchnewpost(
        { title: postTitle, post: postText, userId, accountId },
        token
      );
      message = post.message;
      if (message) {
        alert(message);
      }

      if (filename) await fetchsendimage(file, post._id, token);
    } else {
      let post = await fetchupdatepost(
        { title: postTitle, post: postText, userId },
        id,
        token
      );
      message = post.message;
      if (message) {
        alert(message);
      }
      if (filename) await fetchsendimage(file, id, token);
    }

    if (!message) navigate(`/posts`);
  }

  function changefilename() {
    let filename = document.getElementById("file").files[0].name;
    document.getElementById("file-desc").textContent = filename;
  }

  return (
    <section className="section">
      <input id="postTitle" className="input" placeholder="Titre du post" />

      <br />
      <br />
      <textarea
        id="postText"
        className="textarea"
        placeholder="Post"
        rows="10"
      ></textarea>
      <br />

      <label className="file-label">
        <input
          className="file-input"
          type="file"
          name="resume"
          id="file"
          onChange={changefilename}
        />
        <span className="file-cta">
          <span className="file-icon">
            <i className="fas fa-upload"></i>
          </span>
          <span className="file-label" id="file-desc">
            Choisir une image…
          </span>
        </span>
      </label>

      <br />
      <div className="field">
        <p className="control">
          <button
            className="button is-success"
            onClick={function () {
              submitNewPost();
            }}
          >
            Envoyer
          </button>
        </p>
      </div>
    </section>
  );
}

export default NewpostForm;
