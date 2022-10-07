import { fetchsettings } from "../providers/user";
import {
  getStorageUser,
  getStorageToken,
  getStorageAccount,
  setAvatarLink,
} from "../util/localstorageManager";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { fetchsendavatar } from "../providers/user";

function SettingsForm() {
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

  async function submitSettings() {
    let userId = user; //getStorageUser();
    let accountId = account; //getStorageAccount();
    //let token = getStorageToken();
    let name = document.getElementById("name").value;

    let file = document.getElementById("file").files[0];
    let filename = document.getElementById("file").value;
    let message = undefined;
    if (name) {
      let result = await fetchsettings({ name }, token);
      message = result.message;
      if (message) {
        alert(message);
      }
    }
    if (filename) {
      let avatar = await fetchsendavatar(file, token);
      setAvatarLink(avatar.path);
    }

    if (!message) navigate(`/posts`);
  }

  function changefilename() {
    let filename = document.getElementById("file").files[0].name;
    document.getElementById("file-desc").textContent = filename;
  }
  return (
    <section className="section">
      <div className="field">
        <p className="control">
          <input id="name" className="input" placeholder="Nom" />
        </p>
      </div>

      <br />
      <div className="file">
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
              Choisis un avatar…
            </span>
          </span>
        </label>
      </div>
      <br />
      <div className="field">
        <p className="control">
          <button className="button is-success" onClick={submitSettings}>
            Envoyer
          </button>
        </p>
      </div>
    </section>
  );
}

export default SettingsForm;
