import {useState} from "react";
import SubmitButton from "../components/SubmitButton";
import FormLayout from "../components/FormLayout";

const SignUp = ({handleSubmit, errorMessage, setErrorMessage, loading}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();
        setErrorMessage("");
        handleSubmit({firstName, lastName, email, password});
    }

    return (
        <FormLayout errorMessage={errorMessage} label="Sign up">
            <form className="mt-5" onSubmit={submitHandler}>
                <input
                    type="text"
                    className="block w-full p-3 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
                    style={{backgroundColor: "#2A293B"}}
                    name="firstname"
                    autoComplete="off"
                    placeholder="First Name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />

                <input
                    type="text"
                    className="block w-full p-3 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
                    style={{backgroundColor: "#2A293B"}}
                    name="lastname"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
                <input
                    type="text"
                    className="block w-full p-3 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
                    style={{backgroundColor: "#2A293B"}}
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="block w-full p-3 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
                    style={{backgroundColor: "#2A293B"}}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <SubmitButton loading={loading} value="Create Account"/>
            </form>
        </FormLayout>
    );
}

export default SignUp;