import { fetchnewpost } from "../providers/post";
import {
  getStorageUser,
  getStorageToken,
  getStorageAccount,
} from "../util/localstorageManager";

async function submitNewPost() {
  let postTitle = document.getElementById("postTitle").value;
  let postText = document.getElementById("postText").value;
  let accountId = getStorageAccount();
  let token = getStorageToken();
  let userId = getStorageUser();

  await fetchnewpost(
    { title: postTitle, post: postText, user: userId, accountId },
    token
  );
  //window.location.href = `./posts`;
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
