import {FiArrowLeftCircle} from "react-icons/fi";


const FormBackButton = ({clickHandler}) => {
    return (
        <button onClick={clickHandler}>
            <FiArrowLeftCircle size={48} className="text-purple-700 hover:text-yellow-400"/>
        </button>
    );
}

export default FormBackButton;