

function SignupForm() {
    return (
        <div>
    <h1>Inscription</h1>
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

export default SignupForm;