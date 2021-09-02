import {render, screen, getByText} from '@testing-library/react';
import CheckedIn from "../components/CheckedIn";


test('Renders correct message', () => {
    window.scrollTo = jest.fn()
    const setCheckIn = jest.fn();
    render(<CheckedIn user={{firstName: "Bob"}}/>)
    const element = screen.getByText("You're checked in Bob !")
    expect(element).toBeInTheDocument();
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenLastCalledWith(0,0);
})


