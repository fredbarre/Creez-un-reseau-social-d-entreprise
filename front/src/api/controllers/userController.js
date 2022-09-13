import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "../managers/jwt";

/*import env from "../managers/env";
if (!env.JWT_SECRET) console.log("TOKENSECRET must be set in .env");
const { JWT_SECRET } = env;*/
import joischema from "../managers/joivalidator";

let signup = async function (req, res) {
  try {
    let { error, value } = joischema.validate({
      email: req.body.email,
      password: req.body.password,
    });

    if (error != undefined) throw new Error("error");
    let hash = await bcrypt.hash(req.body.password, 10);

    const user = new userModel({
      email: req.body.email,
      password: hash,
    });
    user.save();
    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

let login = async function (req, res) {
  let user = await userModel
    .findOne({ email: req.body.email })
    .catch((error) => {
      throw res.status(500).json({ error });
    });

  if (!user) {
    return res
      .status(401)
      .json({ message: "Paire login/mot de passe incorrecte" });
  }
  let valid = await bcrypt
    .compare(req.body.password, user.password)
    .catch((error) => {
      throw res.status(500).json({ error });
    });

  if (!valid) {
    return res
      .status(401)
      .json({ message: "Paire login/mot de passe incorrecte" });
  }
  const userId = user._id;

  res.status(200).json({
    userId,
    token: jwt.sign({ userId }),
  });
};

export default { signup, login };
