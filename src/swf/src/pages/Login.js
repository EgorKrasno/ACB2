import {useState} from "react";
import SubmitButton from "../component/SubmitButton";
import FormLayout from "../component/FormLayout";

const Login = ({handleLogin, errorMessage, setErrorMessage, loading}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();
        setErrorMessage("");
        handleLogin({email, password});
    }

    return (
        <FormLayout errorMessage={errorMessage} label="Login">
            <form className="mt-5" onSubmit={submitHandler}>
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
                <SubmitButton loading={loading} value="Login"/>
            </form>
        </FormLayout>
    );
}

export default Login;