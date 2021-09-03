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
import Admin from "./pages/Admin";
import MobileMenu from "./NavBar/MobileMenu";
import DesktopMenu from "./NavBar/DesktopMenu";
import Modal from "./components/Modal";


const App = () => {
    const [userData, setUserData] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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
        setLoading(true);
        try {
            const response = await register({firstName, lastName, email, password});
            const user = await response.json();
            const token = response.headers.get("Jwt-Token");
            localStorage.setItem("currentUser", JSON.stringify({user, token}));
            setUserData(user);
            setLoggedIn(true);
        } catch (err) {
            const response = await err.json();
            setErrorMessage(response.message);
        } finally {
            setLoading(false);
        }
    }

    const handleLogin = async ({email, password}) => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }

    const showLogoutModal = () => setIsOpen(true);

    const handleLogout = (e) => {
        setIsOpen(true);
        if (e){
            setLoggedIn(false);
            setUserData("");
            localStorage.clear();
        }

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

                        <MobileMenu loggedIn={loggedIn} setErrorMessage={setErrorMessage}
                                    handleLogout={showLogoutModal}/>

                        <DesktopMenu loggedIn={loggedIn} setErrorMessage={setErrorMessage}
                                     handleLogout={showLogoutModal}/>
                    </div>
                </div>

                <Switch>
                    <Route path="/dashboard">
                        {!loggedIn ? <Redirect to="/login"/> : <Admin/>}
                    </Route>
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

            <Modal isOpen={isOpen} setIsOpen={setIsOpen} modalAction={handleLogout}/>
        </Router>
    );
}

export default App;
