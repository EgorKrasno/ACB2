import Loader from "react-loader-spinner";

const FormNextButton = ({label, handleClick, loading}) => {

    return (
        <button
            className="flex justify-center w-full text-center font-medium py-3 rounded-3xl text-white focus:outline-none bg-gradient-to-r from-pink-500 to-purple-500"
            onClick={handleClick}
        >
            {loading ? <Loader type="BallTriangle" color="#FFFFFF" height={24} width={24}/> : label}
        </button>
    );
}

export default FormNextButton;