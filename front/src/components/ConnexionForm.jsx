

function ConnexionForm() {
    return (
        <div>
    <h1>Connexion</h1>
    <div>
        <form>
            <label for="email">Email: </label>
            <input type="email" id="email" name="email" /> <br />
            <label for="password">Mot de passe: </label>
            <input type="password" id="password" name="password" /> <br />
            <input type="submit" value="connexion" />
        </form>
            </div>
            </div>
    );
}

export default ConnexionForm;