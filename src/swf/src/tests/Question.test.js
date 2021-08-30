import {getByText, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Question from "../components/Question";

test('Renders question with question and question info', () => {
    const {getByText} = render(<Question question="Test question #1" questionInfo="Test question info"
                                         handleQuestion={jest.fn()}/>)
    expect(getByText("Test question #1")).toBeInTheDocument();
    expect(getByText("Test question info")).toBeInTheDocument();
})

test('Sends back correct responses when clicked on yes and no', () => {
    const {getByText} = render(<Question question="Test question #1" questionInfo="Test question info"
                                         handleQuestion={jest.fn()}/>)
    expect(getByText("Test question #1")).toBeInTheDocument();
    expect(getByText("Test question info")).toBeInTheDocument();
})

test('Sends back correct responses when clicked on yes and no', () => {
    const handleQuestion = jest.fn();
    const {getByText} = render(<Question question="Test question #1" questionInfo="Test question info"
                                         handleQuestion={handleQuestion}/>)
    const btnYes = getByText("Yes");
    const btnNo = getByText("No");
    userEvent.click(btnYes);
    expect(btnYes).toHaveClass("border-yellow-400");
    expect(handleQuestion).toHaveBeenCalledTimes(1);
    expect(handleQuestion).toHaveBeenLastCalledWith("y");

    userEvent.click(btnNo);
    expect(btnNo).toHaveClass("border-yellow-400");
    expect(handleQuestion).toHaveBeenCalledTimes(2);
    expect(handleQuestion).toHaveBeenLastCalledWith("n");
})