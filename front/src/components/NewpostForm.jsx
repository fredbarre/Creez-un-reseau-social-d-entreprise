function NewpostForm() {
  return (
    <section className="section">
      <div className="field">
        <p className="control">
          <input className="input" type="email" placeholder="Titre du post" />
        </p>
      </div>

      <textarea className="textarea" placeholder="Post" rows="10"></textarea>
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
          <button className="button is-success">Envoyer</button>
        </p>
      </div>
    </section>
  );
}

export default NewpostForm;
