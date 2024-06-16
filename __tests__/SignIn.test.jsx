import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import AuthSignIn from "../src/components/Auth/SignIn.jsx";
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

  test("updates on input change", async () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <AuthSignIn />
      </Provider>,
    );

    const usernameInput = getByLabelText(/Username/i);
    const passwordInput = getByLabelText(/Password/i);

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "testuser" } });
      fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("testpassword");
  });

  test("shows error message when username is blank", async () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <AuthSignIn />
      </Provider>,
    );

    // Check if username and password fields are present
    const usernameInput = getByLabelText(/Username/i);
    const passwordInput = getByLabelText(/Password/i);

    // Simulate leaving the username field blank and moving to the next field
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "" } });
      fireEvent.blur(usernameInput);
      fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    });

    // Check if the error message is displayed
    expect(screen.getByText("Username is required")).toBeInTheDocument();
  });

  test("shows error message when password is blank", async () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <AuthSignIn />
      </Provider>,
    );

    // Check if username and password fields are present
    const usernameInput = getByLabelText(/Username/i);
    const passwordInput = getByLabelText(/Password/i);

    // Simulate leaving the username field blank and moving to the next field
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "textusername" } });
      fireEvent.change(passwordInput, { target: { value: "" } });
      fireEvent.blur(passwordInput);
    });

    // Check if the error message is displayed
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });
});
