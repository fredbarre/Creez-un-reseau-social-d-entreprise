function NewpostForm() {
    return (
        <section class="section">
        <div class="field">
            <p class="control">
                <input class="input" type="email" placeholder="Titre du post"/>


            </p>
        </div>

        <textarea class="textarea" placeholder="Post" rows="10"></textarea>
        <br />
        <div class="file">
            <label class="file-label">
                <input class="file-input" type="file" name="resume"/>
                <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                        Choisir une image…
                    </span>
                </span>
            </label>
        </div>
        <br />
        <div class="field">
            <p class="control">
                <button class="button is-success">
                    Envoyer
                </button>
            </p>
        </div>
    </section>
    )
}

export default NewpostForm;