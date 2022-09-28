import { setStorage } from "../util/localstorageManager";
import { fetchlogin } from "../providers/user";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

function LoginForm() {
  let { user, setUser, account, setAccount, token, setToken } =
    useContext(UserContext);

  async function submitLogin() {
    //const { user, setUser, account, setAccount, token, setToken } = userData;

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let logindata = await fetchlogin({ email: email, password: password });
    /*console.log(
      "submitlogin" +
        logindata.accountId +
        " " +
        logindata.token +
        "  " +
        logindata
    );*/

    setUser(logindata.userId);
    setAccount(logindata.accountId);
    setToken(logindata.token);

    /*console.log("login form");
    console.log(user);
    console.log(account);
    console.log(token);*/

    setStorage(logindata.accountId, logindata.userId, logindata.token);
    //window.location.href = `./posts`;
  }

  return (
    <div>
      <h1>Connexion</h1>
      <section className="section">
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              id="email"
              className="input"
              type="email"
              placeholder="Email"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              id="password"
              className="input"
              type="password"
              placeholder="Password"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button
              className="button is-success"
              onClick={function () {
                submitLogin();
              }}
            >
              Connexion
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}

export default LoginForm;
