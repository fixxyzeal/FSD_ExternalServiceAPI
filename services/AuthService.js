const config = require("../config");
const jwt = require("jsonwebtoken");

function GetToken(username, password) {
  // Filter user from the users array by username and password
  const user = config.user === username && config.pass === password;

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { username: config.user, role: "admin" },
      config.token_secret,
      { expiresIn: "2h" }
    );

    const refreshToken = jwt.sign(
      { username: config.user, role: "admin" },
      config.refresh_secret
    );
    return { accessToken: accessToken, refreshToken: refreshToken };
  } else {
    return { error: "Username or password incorrect" };
  }
}

function GetRefreshToken(token, res) {
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, config.refresh_secret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { username: config.user, role: "admin" },
      config.token_secret,
      { expiresIn: "2h" }
    );

    return res.json({
      accessToken
    });
  });
}

module.exports = { GetToken, GetRefreshToken };
