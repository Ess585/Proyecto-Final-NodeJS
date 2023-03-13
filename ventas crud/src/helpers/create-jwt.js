const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

const generateJWT = async (uId, username, email) => {
  const payload = { uId, username, email };
  try {
    const token = await jwt.sign(payload, secret, {
      expiresIn: "7days",
    });
    return token;
  } catch (error) {
    throw new Error("Tuvimos un problema en poder generar el token" + error);
  }
};

module.exports = { generateJWT };
