import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const secret = "test";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token, secret);

      req.userId = decodedData?.sub; //google authentification
    }

    next();
  } catch (error) {
    console.log(error);
  }
};