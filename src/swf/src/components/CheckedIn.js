import useWindowDimensions from "../hooks/UseWindowDimensions";
import Confetti from 'react-confetti'
import {useEffect} from "react";

const CheckedIn = ({user, setCheckIn}) => {
    const { height, width } = useWindowDimensions();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Confetti
                width={width}
                height={height}
            />

            <div className="flex flex-col items-center space-y-6 mt-24 sm:mt-64">
                <h1 className="text-yellow-400 text-center text-6xl font-bold capitalize animate__animated animate__fadeInDownBig overflow-hidden">You're
                    checked in {user.firstName} !</h1>
                <button
                    onClick={setCheckIn}
                    className="max-w-md mr-6 text-center font-small px-3 py-2 rounded-md animate__animated animate__fadeInUpBig overflow-hidden text-white focus:outline-none border-2 border-purple-600 hover:border-yellow-400">Check
                    In Again
                </button>
            </div>
        </>
    );
}

export default CheckedIn;