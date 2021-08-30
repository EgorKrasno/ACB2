const RadioInput = ({label, value, isChecked, handleChange,}) => {

    return (
        <div
            onClick={() => handleChange(value)}
            className={`max-w-3xl px-12 text-center font-medium py-3 rounded-3xl text-white rounded-md text-white focus:outline-none border-4 cursor-pointer hover:border-yellow-400 ${isChecked ? "border-yellow-400" : "border-purple-700 border-opacity-50"}`}>
            {label}
        </div>
    );
}

export default RadioInput;