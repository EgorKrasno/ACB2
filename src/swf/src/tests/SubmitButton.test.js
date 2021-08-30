import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import SubmitButton from "../components/SubmitButton";

test('Renders text when loading is false', () => {
    render(<SubmitButton value="Submit" loading={false}/>)
    const button = screen.getByText("Submit");
    const loadingIcon = screen.queryByLabelText("audio-loading");
    expect(button).toBeInTheDocument();
    expect(loadingIcon).toBeNull();
});

test('Renders loading icon when loading is true', () => {
    render(<SubmitButton value="Submit" loading={true}/>)
    const button = screen.queryByText("Submit");
    const loadingIcon = screen.getByLabelText("audio-loading");
    expect(button).toBeNull();
    expect(loadingIcon).toBeInTheDocument();
});