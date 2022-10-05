import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../contexts/UserContext";
import { fetchupdatecomment } from "../providers/post";

function CommentForm() {
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
  let navigate = useNavigate();
  const { id } = useParams();
  async function submitComment() {
    let comment = document.getElementById("commentText").value;
    fetchupdatecomment({ userId: user, comment }, id, token);
    navigate("/");
  }
  return (
    <section className="section">
      <br />
      <textarea
        id="commentText"
        className="textarea"
        placeholder="Commentaire"
        rows="10"
      ></textarea>
      <br />

      <br />
      <div className="field">
        <p className="control">
          <button
            className="button is-success"
            onClick={function () {
              submitComment();
            }}
          >
            Envoyer
          </button>
        </p>
      </div>
    </section>
  );
}

export default CommentForm;
