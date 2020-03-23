const authService = require("../services/AuthService");
const config = require("../config");

test("GetToken", () => {
  expect(authService.GetToken(config.user, config.pass)).not.toEqual({
    error: "Username or password incorrect"
  });
});

test("GetTokenError", () => {
  expect(authService.GetToken("aa", "bb")).toEqual({
    error: "Username or password incorrect"
  });
});
