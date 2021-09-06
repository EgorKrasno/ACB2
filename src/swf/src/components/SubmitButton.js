import Loader from "react-loader-spinner";

const SubmitButton = ({loading, isValid}) => {
    const submitText = () => !isValid ? "Create Account" : "Create Account 🚀"

    return (
        <button
            data-testid="submit-button"
            type="submit"
            disabled={!isValid}
            className={`${isValid ? "bg-gradient-to-r from-pink-500 to-purple-500" : "cursor-auto bg-gray-700 text-gray-500 bg-opacity-40"} flex justify-center w-full text-center font-medium py-3 rounded-3xl text-white focus:outline-none mt-5`}
        >
            {loading ? <Loader type="BallTriangle" color="#FFFFFF" height={24}
                               width={24}/> : submitText()}
        </button>
    )
}
export default SubmitButton;