import Loader from "react-loader-spinner";

const SubmitButton = ({value, loading}) =>
        <button
            data-testid="submit-button"
            type="submit"
            className="flex justify-center cursor-pointer w-full text-center font-medium py-3 rounded-3xl text-white focus:outline-none mt-5 bg-gradient-to-r from-pink-500 to-purple-500"
        >
            {loading ? <Loader type="BallTriangle" color="#FFFFFF" height={24} width={24}/> : value}
        </button>
export default SubmitButton;