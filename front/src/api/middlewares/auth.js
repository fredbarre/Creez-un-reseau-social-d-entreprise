import jwt from "../managers/jwt";

export let auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token);
    const { userId, accountId, role } = decodedToken;

    req.auth = decodedToken;

    console.log("auth");
    //console.log(req.body.accountId);
    console.log(req.body.userId);

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

export let authPost = (allowAdmin) => (req, res, next) => {
  if (allowAdmin && req.auth.role.includes("admin")) return next();

  if (userId != req.body.userId) throw error;
  //if (accountId != req.body.accountId) throw error;
  next();
};

export default auth;
