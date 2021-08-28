import FormBackButton from "../FormBackButton";
import {useState} from "react";
import RadioInput from "../RadioInput";
import FormNextButton from "../FormNextButton";

const FormPageTwo = (props) => {
    const [selectedInput, setSelectedInput] = useState("");

    const ac_data = [
        {value: "1", status: "Present"},
        {value: "2", status: "Telework"},
        {value: "3", status: "TDY"},
        {value: "4", status: "PTDY"},
        {value: "5", status: "CON Leave"},
        {value: "6", status: "Leave"},
        {value: "7", status: "Pass"},
        {value: "8", status: "Sick Call"},
        {value: "9", status: "Emergency"},
        {value: "10", status: "Other"},
    ]

    const handleChange = inputValue => {
        setSelectedInput(inputValue);
        props.setResults({...props.results, ac: inputValue})
    };

    return (<>
            <h1 className="text-white font-medium text-3xl text-center mb-6">Accountability</h1>
            <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
                {ac_data.map(e => <RadioInput value={e.value} label={e.status} isChecked={selectedInput === e.value}
                                              handleChange={handleChange}/>)}
            </div>

            <div className="flex flex-row space-x-4">
                <FormBackButton clickHandler={props.previousStep}/>
                <FormNextButton label="Submit" handleClick={props.handleSubmit}/>
            </div>
        </>
    );
}

export default FormPageTwo;