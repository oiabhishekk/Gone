import jwt from "jsonwebtoken";
const createToken = (res, userId) => {
  const secretKey = process.env.JWT_SECRET;
  const expiresIn = "30d"; // Token expiration time

  const token = jwt.sign({ userId }, secretKey, { expiresIn });
  // set cookkie as http only to make it more secure
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });
  return token;
};

export default createToken;
