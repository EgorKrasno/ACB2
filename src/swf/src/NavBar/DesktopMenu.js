import {Link} from "react-router-dom";
import SettingsMenu from "./SettingsMenu";

const DesktopMenu = ({loggedIn, setErrorMessage, handleLogout}) => {

    return (
        <>
            {!loggedIn ?
                //Not logged in on Desktop
                <div
                    className="hidden sm:block space-x-5">
                    <Link to="/login">
                        <button
                            onClick={() => setErrorMessage("")}
                            className="text-center font-small px-3 py-2 rounded-md text-white focus:outline-none border-2 border-purple-600 hover:border-yellow-400"
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
                //Logged in on Desktop
                <div
                    className="hidden sm:flex items-center">
                    <Link to="/dashboard">
                        <button
                            onClick={() => setErrorMessage("")}
                            className="mr-3 text-center font-small px-3 py-2 rounded-md text-white focus:outline-none border-2 border-purple-600 hover:border-yellow-400">
                            Dashboard
                        </button>
                    </Link>
                    <SettingsMenu handleLogout={handleLogout}/>
                </div>
            }
        </>
    );
}

export default DesktopMenu;