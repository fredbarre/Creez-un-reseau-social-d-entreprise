import { setStorage } from "../util/localstorageManager";
import { fetchlogin } from "../providers/user";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
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

  async function submitLogin() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let logindata = await fetchlogin({ email: email, password: password });

    setUser(logindata.userId);
    setAccount(logindata.accountId);
    setToken(logindata.token);
    setRole(logindata.role);
    connected = true;
    setConnected(true);

    console.log("login form");
    console.log(user);
    console.log(account);
    console.log(token);
    console.log(connected);

    /* setStorage(
      logindata.accountId,
      logindata.userId,
      logindata.role,
      logindata.token
    );*/

    navigator.serviceWorker.controller.postMessage({
      type: "SET_TOKEN",
      token: logindata.token,
    });
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
