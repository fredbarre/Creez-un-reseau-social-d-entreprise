import accountModel from "../models/accountModel";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "../managers/jwt";
import fs from "fs";

/*import env from "../managers/env";
if (!env.JWT_SECRET) console.log("TOKENSECRET must be set in .env");
const { JWT_SECRET } = env;*/
import joischema from "../managers/joivalidator";

export async function signup(req, res) {
  try {
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
  } catch (error) {
    return res.status(400).json({ message: "champs non corrects !" });
  }
  return res.status(201).json({ okmessage: "Utilisateur créé !" });
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
  let user = await userModel.findOne({ _id: userId });
  let avatarLink = user.avatarLink;
  return res.status(200).json({
    accountId,
    userId,
    role,
    avatarLink,
    token: jwt.sign({ accountId, userId, role }),
  });
};

async function setSettings(req, res) {
  let name = req.body.name;
  let userId = req.auth.userId;
  await userModel.updateOne(
    { _id: userId },
    {
      name: name,
    }
  );
  return res.status(200).json({ message: "paramètres mis a jour" });
}

async function uploadAvatar(req, res) {
  //console.log(req.file.path);
  let userId = req.auth.userId;
  let user = await userModel.findOne({ _id: userId });

  try {
    await fs.promises.unlink(user.avatarLink);
  } catch (error) {}

  await userModel.updateOne(
    { _id: userId },
    {
      avatarLink: req.file.path,
    }
  );

  return res.status(200).json(req.file);
}

export default {
  signup,
  login,
  setSettings,
  uploadAvatar,
};
