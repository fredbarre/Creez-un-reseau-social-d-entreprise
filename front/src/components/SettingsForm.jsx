import { fetchsettings } from "../providers/user";
import {
  getStorageUser,
  getStorageToken,
  getStorageAccount,
} from "../util/localstorageManager";

function SettingsForm() {
  async function submitSettings() {
    let userId = getStorageUser();
    let accountId = getStorageAccount();
    let token = getStorageToken();
    let name = document.getElementById("name").value;
    await fetchsettings({ accountId, userId, name }, token);
    //window.location.href = `./posts`;
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
          <input className="file-input" type="file" name="resume" />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">Choisis un avatar…</span>
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
