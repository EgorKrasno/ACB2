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
import {FiMenu} from "react-icons/fi";
import {FiX} from "react-icons/fi";
import Admin from "./pages/Admin";

const App = () => {
    const [userData, setUserData] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

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
        setShowMobileMenu(false);
        setLoading(true);
        try {
            await register({firstName, lastName, email, password});
            //Test Refactor
            const response = await login({email, password});
            const user = await response.json();
            const token = response.headers.get("Jwt-Token");
            localStorage.setItem("currentUser", JSON.stringify({user, token}));
            setUserData(user);
            setLoggedIn(true);
        } catch (err) {
            const response = await err.json();
            setErrorMessage(response.message);
        }
        setLoading(false);
    }

    const handleLogin = async ({email, password}) => {
        setShowMobileMenu(false)
        setLoading(false);
        try {
            const response = await login({email, password});
            const user = await response.json();
            const token = response.headers.get("Jwt-Token");
            localStorage.setItem("currentUser", JSON.stringify({user, token}));
            setUserData(user);
            setLoggedIn(true);
        } catch (err) {
            const response = await err.json();
            setErrorMessage(response.message);
        }
        setLoading(false);

    }

    const handleLogout = () => {
        setLoggedIn(false);
        setUserData("");
        localStorage.clear();
    }


    return (
        <Router>
            <div className="min-h-screen flex flex-col" style={{backgroundColor: "#0B091C"}}>
                <div className="w-full mx-auto px-2 px-4 sm:px-8">
                    <div className="relative flex items-center justify-between h-20">
                        <div className="flex-1 flex items-stretch justify-start">
                            <Link to="/" className="text-yellow-400 font-bold text-5xl flex items-center">🤖 <span
                                className="mx-2 text-3xl">2.0</span></Link>
                        </div>


                        <div className="-mr-2 flex sm:hidden">
                            <button
                                data-testid="mobile-menu-button"
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                                className="text-yellow-400 dark:text-white hover:text-yellow-200 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                                {showMobileMenu ? <FiX title="mobile-menu-close" size={38}/> :
                                    <FiMenu title="mobile-menu-open" size={38}/>}
                            </button>
                        </div>

                        {showMobileMenu &&
                        <div data-testid="mobile-menu-dropdown" className="sm:hidden z-10">
                            <div
                                className="origin-top-right absolute right-0 rounded-md mt-6 w-52 px-4 divide-y divide-gray-600"
                                style={{backgroundColor: "#171727"}}>
                                {!loggedIn ?
                                    <>
                                        <div>
                                            <Link to="/signup">
                                                <button
                                                    onClick={() => {
                                                        setErrorMessage("")
                                                        setShowMobileMenu(false)
                                                    }}
                                                    className="text-gray-100 hover:text-yellow-400 py-3 block rounded-md text-base font-medium">
                                                    Sign up
                                                </button>
                                            </Link>
                                        </div>
                                        <div>
                                            <Link to="/login">
                                                <button
                                                    onClick={() => {
                                                        setErrorMessage("");
                                                        setShowMobileMenu(false)
                                                    }}
                                                    className="text-gray-100 hover:text-yellow-400 py-3 block rounded-md text-base font-medium">
                                                    Login
                                                </button>
                                            </Link>
                                        </div>
                                    </>
                                    : <div>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setShowMobileMenu(false);
                                            }}
                                            className="text-gray-100 hover:text-yellow-400 py-3 block rounded-md text-base font-medium">
                                            Logout
                                        </button>
                                    </div>
                                }

                            </div>
                        </div>}


                        {!loggedIn ?
                            <div
                                className="hidden sm:block absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <Link to="/login">
                                    <button
                                        onClick={() => setErrorMessage("")}
                                        className="mr-6 text-center font-small px-3 py-2 rounded-md text-white focus:outline-none border-2 border-purple-600 hover:border-yellow-400"
                                    >Login
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <button
                                        onClick={() => setErrorMessage("")}
                                        className="text-center font-small px-3 py-2 rounded-md text-white focus:outline-none bg-gradient-to-r from-pink-500 to-purple-500">
                                        Sign Up
                                    </button>
                                </Link>

                            </div> :
                            <div
                                className="hidden sm:block absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    onClick={handleLogout}
                                    className="mr-6 text-center font-small px-3 py-2 rounded-md text-white focus:outline-none border-2 border-purple-600 hover:border-yellow-400"
                                >Logout
                                </button>
                            </div>
                        }
                    </div>
                </div>


                <Switch>
                    <Route path="/admin"><Admin/></Route>
                    <Route path="/signup">
                        {loggedIn ? <Home user={userData}/> :
                            <SignUp loading={loading} handleSubmit={handleSubmit} errorMessage={errorMessage}
                                    setErrorMessage={setErrorMessage}/>}
                    </Route>
                    <Route path="/login">
                        {loggedIn ? <Redirect to="/"/> :
                            <Login loading={loading} handleLogin={handleLogin} errorMessage={errorMessage}
                                   setErrorMessage={setErrorMessage}/>}
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
