import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from "../App";

test('Renders the Logo on startup', ()=>{
    render(<App/>)
    const element = screen.getByText("2.0");
    expect(element).toBeInTheDocument();
})

test('Renders nav bar buttons on desktop', ()=>{
    render(<App/>)
    const element = screen.getByText("Sign Up");
    expect(element).toBeInTheDocument();
})

test('Mobile menu opens and closes', ()=>{
    render(<App/>)
    const menuButton = screen.getByTestId("mobile-menu-button");

    userEvent.click(menuButton);
    expect(screen.queryByTitle("mobile-menu-close")).toBeInTheDocument();
    expect(screen.queryByTitle("mobile-menu-open")).toBeNull();
    userEvent.click(menuButton);
    expect(screen.queryByTitle("mobile-menu-close")).toBeNull();
    expect(screen.queryByTitle("mobile-menu-open")).toBeInTheDocument();
})

test('Mobile menu shows dropdown when pressed', ()=>{
    render(<App/>)
    const menuButton = screen.getByTestId("mobile-menu-button");

    userEvent.click(menuButton);
    expect(screen.getByTestId("mobile-menu-dropdown")).toBeInTheDocument();
})