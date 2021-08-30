import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import FormLayout from "../components/FormLayout";

test("FormLayout renders with label", ()=> {
    render(<FormLayout errorMessage="Test Error" label="Login">
        <h1>Test Child</h1>
    </FormLayout>);
    const child = screen.getByText("Login");
    expect(child).toBeInTheDocument();
});

test("FormLayout renders children", ()=> {
   render(<FormLayout errorMessage="Test Error" label="Test Label">
       <h1>Test Child</h1>
   </FormLayout>);
   const child = screen.getByText("Test Child");
   expect(child).toBeInTheDocument();
});

test("FormLayout renders error Message", ()=> {
    render(<FormLayout errorMessage="Test Error" label="Test Label">
        <h1>Test Child</h1>
    </FormLayout>);
    const error = screen.getByText("Test Error");
    expect(error).toBeInTheDocument();
});

test("FormLayout does not render error then empty", ()=> {
    render(<FormLayout errorMessage="" label="Test Label">
        <h1>Test Child</h1>
    </FormLayout>);
    const error = screen.queryByTestId("error");
    expect(error).toBeNull();
});