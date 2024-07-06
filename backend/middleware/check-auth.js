const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //check if token exists
  try {
    const token = req.headers.authorization.split("Bearer ")[1]; // part after Bearer is token
    //check if token is valid

    jwt.verify(token, "secret_this_should_be_longer");
    next(); //to continue to api
  } catch (error) {
    // if split fails
    console.log("error", error);
    res.status(401).json({
      message: "Auth Failed",
    });
  }
};
