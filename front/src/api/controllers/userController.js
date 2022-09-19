import accountModel from "../models/accountModel";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "../managers/jwt";

/*import env from "../managers/env";
if (!env.JWT_SECRET) console.log("TOKENSECRET must be set in .env");
const { JWT_SECRET } = env;*/
import joischema from "../managers/joivalidator";

export async function signup(req, res) {
  let { error, value } = joischema.validate(req.body);
  console.log(req.body);
  if (error) throw error;
  const { email, password } = req.body;
  let hash = await bcrypt.hash(password, 10);

  const account = new accountModel({
    email,
    password: hash,
  });

  const user = new userModel({});
  user.account = account._id;
  account.user = user._id;
  console.log(user._id, account._id);

  await account.save();
  await user.save();
  res.status(201).json({ message: "Utilisateur créé !" });
}

let login = async function (req, res) {
  let account = await accountModel
    .findOne({ email: req.body.email })
    .catch((error) => {
      throw res.status(500).json({ error });
    });

  if (!account) {
    return res
      .status(401)
      .json({ message: "Paire login/mot de passe incorrecte" });
  }
  let valid = await bcrypt
    .compare(req.body.password, account.password)
    .catch((error) => {
      throw res.status(500).json({ error });
    });

  if (!valid) {
    return res
      .status(401)
      .json({ message: "Paire login/mot de passe incorrecte" });
  }
  const accountId = account._id;
  const userId = account.user;

  return res.status(200).json({
    accountId,
    userId,
    token: jwt.sign({ accountId, userId }),
  });
};

export default { signup, login };
