import {getByText, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RadioInput from "../components/RadioInput";

test('Default Style renders when not selected', () => {
    const {getByText} = render(<RadioInput label="Present" value="1" isChecked={false} handleChange={jest.fn()}/>)
    const element = getByText("Present");
    expect(element).toHaveClass("border-purple-700");
    userEvent.click(element);
});

test('Selected style renders when selected', () => {
    const {getByText} = render(<RadioInput label="Present" value="1" isChecked={true} handleChange={jest.fn()}/>)
    const element = getByText("Present");
    expect(element).toHaveClass("border-yellow-400");
});

test('Button reacts to click', () => {
    const handleChange = jest.fn();
    const {getByText} = render(<RadioInput label="Present" value="1" isChecked={false} handleChange={handleChange}/>)
    const element = getByText("Present");
    userEvent.click(element);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenLastCalledWith("1")
});