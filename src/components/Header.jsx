import GroupomaniaLogo from "../assets/icon-left-font.svg";
import SignupForm from "./SignupForm";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { clearStorage, getStorageToken } from "../util/localstorageManager";
import { checkPreferences } from "joi";
import { useUpdate } from "../contexts/Update";
import { useNavigate } from "react-router-dom";

function Header(uptime) {
  const [active, setActive] = useState(false);
  let navigate = useNavigate();
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

  const { update } = useUpdate();
  const { lastUpdate } = useUpdate();
  /*
  useEffect(() => {
    (async function () {
      setConnected(await connect());
      console.log(connected);
    });
  }, [uptime, lastUpdate]);

  let token = getStorageToken();
  async function connect() {
    let connected = await fetchconnected({ token });

    update();
    return connected;
  }*/

  function disconnect() {
    clearStorage();
    setConnected(false);
    update();
    navigate(".");
  }
  /*let connected = false;
  let Pconnected = connect();
  Pconnected.then(
    function (value) {
      connected = value === "true";
      /* code if successful 
    },
    function (error) {
      connected = false;
      /* code if some error 
    }
  );*/

  /*
  let c = connect().then();
  console.log("connect=", c);
  */

  return (
    <header>
      <nav
        className="navbar bgprimary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img
              src="\src\assets\icon-left-font-monochrome-white.png"
              width="112"
              height="28"
              className="objcover"
            />
          </Link>

          <a
            role="button"
            className={`navbar-burger ${active ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={() => setActive(!active)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="navbarBasicExample"
          className={`bgprimary navbar-menu ${active ? "is-active" : ""}`}
        >
          {connected ? (
            <div className="navbar-start">
              <Link className="navbar-item colorwhite" to="/settings">
                Mon profil
              </Link>
              <Link className="navbar-item colorwhite" to="/posts">
                Tous les posts
              </Link>
              {/*
                <Link className="navbar-item colorwhite" to="/myposts">
                  Mes posts
                </Link>*/}
              <Link className="navbar-item colorwhite" to="/newPost">
                Nouveau post
              </Link>
            </div>
          ) : null}
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons  is-centered">
                {connected ? (
                  <button className="button is-primary" onClick={disconnect}>
                    <strong>Deconnexion</strong>
                  </button>
                ) : (
                  <div>
                    <Link className="button is-primary" to="/signup">
                      <strong>Inscription</strong>
                    </Link>
                    <Link className="button is-light" to="/login">
                      Connexion
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <br />
    </header>
  );
}

export default Header;
