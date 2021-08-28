import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
} from "react-router-dom";
import './index.css'
import SignUp from "./pages/SignUp";
import Login from './pages/Login';
import Home from "./pages/Home";
import {register, login} from "./services/Service";
import {useEffect, useState} from "react";

const App = () => {
    const [userData, setUserData] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("currentUser") !== null) {
            const storage = JSON.parse(localStorage.getItem("currentUser"));
            setUserData(storage.user);
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    const handleSubmit = async ({firstName, lastName, email, password}) => {
        try {
            const registerResponse = await register({firstName, lastName, email, password});

            //Test Refactor
            const response = await login({email, password});
            const user = await response.json();
            const token = response.headers.get("Jwt-Token");
            localStorage.setItem("currentUser", JSON.stringify({user, token}));
            setUserData(user);
            setLoggedIn(true);

        } catch (err) {
            console.error(err.error);
        }
    }

    const handleLogin = async ({email, password}) => {
        try {
            const response = await login({email, password});
            const user = await response.json();
            const token = response.headers.get("Jwt-Token");
            localStorage.setItem("currentUser", JSON.stringify({user, token}));
            setUserData(user);
            setLoggedIn(true);
        } catch (err) {
            console.error(err.error);
        }

    }

    const handleLogout = () => {
        setLoggedIn(false);
        setUserData("");
        localStorage.clear();
    }


    return (
        <Router>
            <div className="min-h-screen flex flex-col" style={{backgroundColor: "#0B091C"}}>
                <div className="w-full mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <Link to="/" className="text-yellow-400 font-bold text-5xl flex items-center">🤖 <span className="mx-2 text-3xl">2.0</span></Link>
                        </div>
                        {!loggedIn ?
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <Link to="/login">
                                    <button
                                        className="mr-6 text-center font-small px-3 py-2 rounded-md text-white focus:outline-none border-2 border-purple-600 hover:border-purple-500"
                                    >Login
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <button
                                        className="text-center font-small px-3 py-2 rounded-md text-white focus:outline-none bg-gradient-to-r from-pink-500 to-purple-500">
                                        Sign Up
                                    </button>
                                </Link>

                            </div> :
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    onClick={handleLogout}
                                    className="mr-6 text-center font-small px-3 py-2 rounded-md text-white focus:outline-none border-2 border-purple-600 hover:border-purple-500"
                                >Logout
                                </button>
                            </div>
                        }

                    </div>
                </div>


                <Switch>
                    <Route path="/signup">
                        {loggedIn ? <Home user={userData}/> : <SignUp handleSubmit={handleSubmit}/>}
                    </Route>
                    <Route path="/login">
                        {loggedIn ? <Redirect to="/"/> : <Login handleLogin={handleLogin}/>}
                    </Route>
                    <Route path="/">
                        {!loggedIn ? <Redirect to="/login"/> : <Home user={userData}/>}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
