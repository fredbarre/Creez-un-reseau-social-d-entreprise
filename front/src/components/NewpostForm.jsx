import { fetchnewpost } from "../providers/post";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStorageUser,
  getStorageToken,
  getStorageAccount,
} from "../util/localstorageManager";
import { UserContext } from "../contexts/UserContext";

async function submitNewPost() {
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
  if (connected !== true) {
    navigate(`/`);
    window.location.href = "/";
  }

  let postTitle = document.getElementById("postTitle").value;
  let postText = document.getElementById("postText").value;
  let accountId = account; //getStorageAccount();
  //let token = getStorageToken();
  let userId = user; // getStorageUser();

  await fetchnewpost(
    { title: postTitle, post: postText, userId, accountId },
    token
  );
  window.location.href = `./posts`;
}
function NewpostForm() {
  return (
    <section className="section">
      <div className="field">
        <p className="control">
          <input id="postTitle" className="input" placeholder="Titre du post" />
        </p>
      </div>

      <textarea
        id="postText"
        className="textarea"
        placeholder="Post"
        rows="10"
      ></textarea>
      <br />
      <div className="file">
        <label className="file-label">
          <input className="file-input" type="file" name="resume" />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">Choisir une image…</span>
          </span>
        </label>
      </div>
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
