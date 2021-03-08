const { MYSQL_CONF, REDIS_CONF } = require("./db");

describe("Config For MYSQL & REDIS", () => {
  describe("MYSQL", () => {
    it("defaults", () => {
      // Arrange
      // Act
      // Assert
      expect(MYSQL_CONF).toMatchSnapshot();
    });
  });
  describe("REDIS", () => {
    it("defaults", () => {
      // Arrange
      // Act
      // Assert
      expect(REDIS_CONF).toMatchSnapshot();
    });
  });
});
