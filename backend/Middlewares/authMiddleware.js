const jwt = require("jsonwebtoken");

const authuser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const tokenParts = authHeader.split(" ");

    if (tokenParts.length === 2 && tokenParts[0].toLowerCase() === "bearer") {
      const token = tokenParts[1];
      try {
        const decoded = jwt.verify(token, "abc");
        req.user = decoded.id;
        next();
      } catch (error) {
        res.status(401).send({ message: "Invalid token details" });
      }
    } else {
      res.status(401).send({ message: "Invalid authorization header format" });
    }
  } else {
    res.status(401).send({ message: "Authorization header not provided" });
  }
};
module.exports = authuser;
