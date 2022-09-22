import jwt from "../managers/jwt";

let auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token);
    const userId = decodedToken.userId;
    const accountId = decodedToken.accountId;
    req.auth = {
      userId: userId,
      accountId: accountId,
    };
    console.log("auth");
    console.log(req.body.accountId);
    console.log(req.body.userId);
    if (userId != req.body.userId) throw error;
    if (accountId != req.body.accountId) throw error;
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

export default auth;
