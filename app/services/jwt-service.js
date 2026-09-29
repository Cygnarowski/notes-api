import jwt from "jsonwebtoken";

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload.email;
  } catch (err) {
    console.log(err.name);
    console.log(err.message);
  }
};

export default verifyToken;
