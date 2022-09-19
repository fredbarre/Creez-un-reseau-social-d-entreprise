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
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

export default auth;
