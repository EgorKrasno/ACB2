import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from "../App";

test('renders the app', ()=>{
    render(<App/>)
    const element = screen.getByText("2.0");
    expect(element).toBeInTheDocument();
})