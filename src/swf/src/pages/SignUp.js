import {useState} from "react";

const SignUp = ({handleSubmit}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();
        handleSubmit({firstName, lastName, email, password});
    }

    return (
        <div className="flex flex-col flex-1  h-screen">
            <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="px-12 py-12 border-2 border-purple-800 border-opacity-50 rounded-3xl w-full"
                     style={{backgroundColor: "#171727"}}>
                    <h1 className="mb-12 text-5xl font-medium text-white text-center">Sign up</h1>
                    <form onSubmit={submitHandler}>
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
                        {/*<input*/}
                        {/*    type="password"*/}
                        {/*    className="block w-full p-3 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"*/}
                        {/*    style={{backgroundColor: "#2A293B"}}*/}
                        {/*    name="password"*/}
                        {/*    placeholder="Confirm Password"/>*/}
                        <input
                            type="submit"
                            value="Create Account"
                            className="w-full text-center font-medium py-3 rounded-3xl text-white focus:outline-none mt-5 bg-gradient-to-r from-pink-500 to-purple-500"
                        />

                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;