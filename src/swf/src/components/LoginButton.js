import Loader from "react-loader-spinner";

const LoginButton = ({loading}) => {
    return (
        <button
            data-testid="Login-button"
            type="submit"
            className={`bg-gradient-to-r from-pink-500 to-purple-500 cursor-pointer flex justify-center w-full text-center font-medium py-3 rounded-3xl text-white focus:outline-none mt-5`}
        >
            {loading ? <Loader type="BallTriangle" color="#FFFFFF" height={24}
                               width={24}/> : "Login"}
        </button>
    )
}
export default LoginButton;