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
  //console.log(req.body);
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
  //console.log(user._id, account._id);

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
  const role = account.role;
  return res.status(200).json({
    accountId,
    userId,
    role,
    token: jwt.sign({ accountId, userId, role }),
  });
};

async function setSettings(req, res) {
  let name = req.body.name;
  let userId = req.body.userId;
  await userModel.updateOne(
    { _id: userId },
    {
      name: name,
    }
  );
  return res.status(200).json({ message: "paramètres mis a jour" });
}

async function isConnected(req, res) {
  try {
    let token = req.body.token;

    const decodedToken = jwt.verify(token);
    const { userId, accountId, role } = decodedToken;

    let account = await accountModel.findOne({ _id: accountId });
    if (account == null) return res.status(200).json(false);

    console.log("isConnected acc=", account);
  } catch (error) {
    return res.status(200).json(false);
  }
  return res.status(200).json(true);
}

async function uploadAvatar(req, res) {
  console.log("uploadavatar");
  console.log("body");
  console.log(req.body);
  console.log("file");
  console.log(req.file);
  return res.status(200).json("upload réussi");
}
export default { signup, login, setSettings, isConnected, uploadAvatar };
