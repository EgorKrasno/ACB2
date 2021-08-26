import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './index.css'
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

const App = () => {
    return (
        <Router>
            <div className="min-h-screen flex flex-col" style={{backgroundColor: "#0B091C"}}>
                <div className="w-full mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <Link to="/" className="text-white text-2xl">ACB 2.0</Link>
                        </div>
                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button
                                className="mr-6 text-center font-small px-3 py-2 rounded-md text-white focus:outline-none border-2 border-purple-600 hover:border-purple-500"
                            >Login
                            </button>
                            <Link to="/signup">
                                <button
                                    className="text-center font-small px-3 py-2 rounded-md text-white focus:outline-none bg-gradient-to-r from-pink-500 to-purple-500">
                                    Sign Up
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>


                <Switch>
                    <Route path="/signup">
                        <SignUp/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
