import MockAdapter from "axios-mock-adapter";
import AuthService from "../src/services/auth.service.js";
import { axiosInstance } from "../src/services/config/axiosInstance.js";

describe("AuthService", () => {
  it("should login successfully and store user data in local storage", async () => {
    const mockAxios = new MockAdapter(axiosInstance);
    const data = {
      userInformation: { username: "testuser" },
      userToken: {
        accessToken: "accessToken",
      },
    };
    mockAxios.onPost("/auth/login").reply(200, data);

    const response = await AuthService.login("testuser", "testpassword");

    expect(response).toEqual(data);
    expect(JSON.parse(localStorage.getItem("auth"))).toEqual(data);
  });

  it("should throw an error when login fails", async () => {
    const mockAxios = new MockAdapter(axiosInstance);
    mockAxios.onPost("/auth/login").reply(500);

    await expect(AuthService.login("testuser", "testpassword")).rejects.toThrow(
      "Request failed with status code 500",
    );
  });
});
