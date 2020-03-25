const RedisService = require("../services/RedisService");

test("Set Redis", async () => {
  RedisService.SetWithExpire("test", 30, "{test:1234}");

  let data = await RedisService.Get("test");

  await expect(data).toEqual({ test: "1234" });
});
