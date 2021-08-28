
const FormNextButton = ({label, handleClick}) => {

    return(
        <button
            className="w-full text-center font-medium py-3 rounded-3xl text-white focus:outline-none bg-gradient-to-r from-pink-500 to-purple-500"
            onClick={handleClick}
        >{label}
        </button>
    );
}

export default FormNextButton;