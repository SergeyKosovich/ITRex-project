import jwt from "jsonwebtoken";
import { tokenAge } from "../../config";
import tokenService from "../../token/tokenService";

jest.mock("jsonwebtoken");

const token = "lksjfba8a9sd.asofuq9wfuasf.as9d8afwa";
const tokenSecret = "tokenSecret";
const userId = "1234456";
const payload = { user_id: userId };
const data = {
  doctor_id: 3,
  name: "Linus Torvalds",
  createdAt: "2021-09-08T19:44:18.836Z",
  updatedAt: "2021-09-08T19:44:18.836Z",
  user_id: 3,
  specializations: [{ name: "pediatrician" }],
};

beforeEach(() => jest.clearAllMocks());

describe("Class 'TokenService'", () => {
  it("Method 'verify', if token is valid", () => {
    jwt.verify.mockReturnValue(payload);

    expect(tokenService.verify(token, tokenSecret)).toEqual({
      payload,
      error: false,
    });
    expect(jwt.verify).toHaveBeenCalledWith(token, tokenSecret);
    expect(jwt.verify).toHaveBeenCalledTimes(1);
  });

  it("Method 'verify', if token is invalid", () => {
    const error = new Error();
    jwt.verify.mockImplementation(() => {
      throw error;
    });

    expect(tokenService.verify(token, tokenSecret)).toEqual({
      payload: null,
      error: error.name,
    });
    expect(jwt.verify).toHaveBeenCalledWith(token, tokenSecret);
    expect(jwt.verify).toHaveBeenCalledTimes(1);
  });

  it("Method 'generate'", () => {
    jwt.sign.mockReturnValue("access token");

    expect(tokenService.generate(userId, tokenSecret)).toBe("access token");
    expect(jwt.sign).toHaveBeenCalledWith(payload, tokenSecret, {
      expiresIn: tokenAge,
    });
    expect(jwt.sign).toHaveBeenCalledTimes(1);
  });

  it("Method 'generateForStaff'", () => {
    jwt.sign.mockReturnValue("access token");

    expect(tokenService.generateForStaff(data, tokenSecret)).toBe(
      "access token"
    );
    expect(jwt.sign).toHaveBeenCalledWith(data, tokenSecret, {
      expiresIn: tokenAge,
    });
    expect(jwt.sign).toHaveBeenCalledTimes(1);
  });
});
