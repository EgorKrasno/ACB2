const SignUp = ({handleSubmit}) => {

    return (
        <div className="flex flex-col flex-1  h-screen">
            <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="px-12 py-12 border-2 border-purple-800 border-opacity-50 rounded-3xl w-full"
                     style={{backgroundColor: "#171727"}}>
                    <h1 className="mb-12 text-5xl font-medium text-white text-center">Sign up</h1>
                    <input
                        type="text"
                        className="block w-full p-3 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
                        style={{backgroundColor: "#2A293B"}}
                        name="firstname"
                        autoComplete="off"
                        placeholder="First Name"/>
                    <input
                        type="text"
                        className="block w-full p-3 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
                        style={{backgroundColor: "#2A293B"}}
                        name="lastname"
                        placeholder="Last Name"/>
                    <input
                        type="text"
                        className="block w-full p-3 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
                        style={{backgroundColor: "#2A293B"}}
                        name="email"
                        placeholder="Email"/>
                    <input
                        type="password"
                        className="block w-full p-3 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
                        style={{backgroundColor: "#2A293B"}}
                        name="password"
                        placeholder="Password"/>
                    <input
                        type="password"
                        className="block w-full p-3 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
                        style={{backgroundColor: "#2A293B"}}
                        name="password"
                        placeholder="Confirm Password"/>
                    <button
                        type="submit"
                        className="w-full text-center font-medium py-3 rounded-3xl text-white focus:outline-none mt-5 bg-gradient-to-r from-pink-500 to-purple-500"
                        onClick={handleSubmit}
                    >Create Account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;