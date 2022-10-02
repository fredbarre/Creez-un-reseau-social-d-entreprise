import { fetchnewpost } from "../providers/post";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
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
  async function submitNewPost() {
    let postTitle = document.getElementById("postTitle").value;
    let postText = document.getElementById("postText").value;
    let accountId = account; //getStorageAccount();
    //let token = getStorageToken();
    let userId = user; // getStorageUser();

    await fetchnewpost(
      { title: postTitle, post: postText, userId, accountId },
      token
    );

    let file = document.getElementById("file").files[0].name;

    console.log(file);
    await fetchsendavatar(file, token);
    //window.location.href = `./posts`;
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
          <input className="file-input" type="file" name="resume" id="file" />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">Choisir une image…</span>
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
