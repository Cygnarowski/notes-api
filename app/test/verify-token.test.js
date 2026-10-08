import { describe, test, expect, beforeEach, afterEach } from "@jest/globals";
import jwt from "jsonwebtoken";
import verifyToken from "../services/jwt-service";

describe("verify token", () => {
  const originalJWTSecret = process.env.JWT_SECRET;
  beforeEach(() => {
    process.env.JWT_SECRET = "test-secret";
  });

  afterEach(() => {
    if (originalJWTSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJWTSecret;
    }
  });

  test("should return user email for a valid token", () => {
    const token = jwt.sign(
      {
        email: "test@test.pl",
      },
      process.env.JWT_SECRET,
    );
    const result = verifyToken(token);
    expect(result).toBe("test@test.pl");
  });

  test("should throw 401 Unauthorized for invalid token", () => {
    const token = "invalid-token";
    expect(() => verifyToken(token)).toThrow(
      expect.objectContaining({
        message: "Unauthorized",
        statusCode: 401,
      }),
    );
  });

  test("should throw Token expired for expired token", () => {
    const token = jwt.sign(
      {
        email: "test@test.pl",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "-1s",
      },
    );
    expect(() => verifyToken(token)).toThrow(
      expect.objectContaining({
        message: "Token expired",
        statusCode: 401,
      }),
    );
  });

  test("should throw 401 Unauthorized for incorrect JWT Secret", () => {
    const token = jwt.sign(
      {
        email: "test@test.pl",
      },
      "wrong-jwt-secret",
    );
    expect(() => verifyToken(token)).toThrow(
      expect.objectContaining({
        message: "Unauthorized",
        statusCode: 401,
      }),
    );
  });
});
