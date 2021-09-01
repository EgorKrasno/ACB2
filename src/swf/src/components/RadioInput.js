const RadioInput = ({value, isChecked, handleChange,}) => {

    return (
        <div
            onClick={() => handleChange(value)}
            className={`max-w-3xl px-12 text-center font-medium py-3 rounded-3xl text-white rounded-md text-white focus:outline-none border-4 cursor-pointer sm:hover:border-yellow-400 ${isChecked ? "border-yellow-400" : "border-purple-700 border-opacity-50"}`}>
            {value}
        </div>
    );
}

export default RadioInput;