import {render, screen, getByText} from '@testing-library/react';
import CheckedIn from "../components/CheckedIn";

beforeEach(() => {
    const createElement = document.createElement.bind(document);
    document.createElement = (tagName) => {
        if (tagName === 'canvas') {
            return {
                getContext: () => ({}),
                measureText: () => ({})
            };
        }
        return createElement(tagName);
    };
});

test('Renders correct message', () => {
    window.scrollTo = jest.fn()
    const setCheckIn = jest.fn();
    render(<CheckedIn user={{firstName: "Bob"}}/>)
    const element = screen.getByText("You're checked in Bob !")
    expect(element).toBeInTheDocument();
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenLastCalledWith(0,0);
})


