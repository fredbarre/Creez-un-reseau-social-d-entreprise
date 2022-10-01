import { fetchsignup } from "../providers/user";
import { useNavigate } from "react-router-dom";

async function submitSignup() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  console.log("submitsignup email " + email);
  await fetchsignup({ email: email, password: password });
  let navigate = useNavigate();

  navigate(`/`);
}

function SignupForm() {
  return (
    <section className="section">
      <h1>Inscription</h1>

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
          <button className="button is-success" onClick={submitSignup}>
            Inscription
          </button>
        </p>
      </div>
    </section>
  );
}

export default SignupForm;
