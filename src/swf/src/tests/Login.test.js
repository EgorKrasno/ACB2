import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Login from "../pages/Login";

test("Renders the Login Form Page", () => {
    render(<Login handleLogin={jest.fn()} errorMessage="Test Error Message" setErrorMessage={jest.fn()}
                  loading="false"/>)
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
});

test("Calls submitHandler when Login is pressed", () => {
    const loginFn = jest.fn()
    render(<Login handleLogin={loginFn} errorMessage="Test Error Message" setErrorMessage={jest.fn()}
                  loading="false"/>)

    userEvent.type(screen.getByPlaceholderText("Email"), "test@test.com");
    userEvent.type(screen.getByPlaceholderText("Password"), "password");
    userEvent.click(screen.getByTestId("submit-button"))
    expect(loginFn).toHaveBeenCalledTimes(1);
});

