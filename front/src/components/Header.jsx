import GroupomaniaLogo from "../assets/icon-left-font.svg";
import SignupForm from "./SignupForm";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [active, setActive] = useState(false);

  return (
    <header>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img
              src="./src/assets/icon-left-fontadjusted.png"
              width="112"
              height="28"
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
          className={`navbar-menu ${active ? "is-active" : ""}`}
        >
          <div className="navbar-start">
            <Link className="navbar-item" to="/settings">
              Mon profil
            </Link>
            <Link className="navbar-item" to="/posts">
              Tous les posts
            </Link>

            <Link className="navbar-item" to="/myposts">
              Mes posts
            </Link>

            <Link className="navbar-item" to="/login">
              Nouveau post{" "}
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link className="button is-primary" to="/login">
                  <strong>Deconnexion</strong>
                </Link>
                <Link className="button is-primary" to="/signup">
                  <strong>Inscription</strong>
                </Link>
                <Link className="button is-light" to="/login">
                  Connexion
                </Link>
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
