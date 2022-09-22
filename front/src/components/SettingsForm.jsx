function SettingsForm() {
  return (
    <section className="section">
      <div className="field">
        <p className="control">
          <input className="input" placeholder="Nom" />
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
          <button className="button is-success">Envoyer</button>
        </p>
      </div>
    </section>
  );
}

export default SettingsForm;
