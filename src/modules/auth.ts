import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

export const createJwtToken = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET_KEY
  );

  return token;
};

export const authMiddleware = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({
      message: "Not Authorized",
    });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({
      message: "Not a valid token",
    });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    res.json({
      message: "Not a valid token",
    });
    return;
  }
};
