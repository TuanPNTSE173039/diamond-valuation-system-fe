import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import AuthSignIn from "../src/components/Auth/SignIn.jsx";
import { login } from "../src/redux/authSlice.js";
import { store } from "../src/redux/store.js";

// Mock the login function
jest.mock("../src/redux/authSlice.js", () => ({
  login: jest.fn(),
}));

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("SignIn Component", () => {
  test("renders SignIn component", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <AuthSignIn />
      </Provider>,
    );

    // Check if username and password fields are present
    const usernameInput = getByLabelText(/Username/i);
    const passwordInput = getByLabelText(/Password/i);

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("updates on input change", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <AuthSignIn />
      </Provider>,
    );

    const usernameInput = getByLabelText(/Username/i);
    const passwordInput = getByLabelText(/Password/i);

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("testpassword");
  });

  test("submits the form", async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <AuthSignIn />
      </Provider>,
    );

    const usernameInput = getByLabelText(/Username/i);
    const passwordInput = getByLabelText(/Password/i);
    const submitButton = getByText(/Sign In/i);

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    // Check if login function was called
    expect(login).toHaveBeenCalledWith({
      username: "testuser",
      password: "testpassword",
    });
  });
});
