import FormBackButton from "../FormBackButton";
import {useEffect, useState} from "react";
import RadioInput from "../RadioInput";
import FormNextButton from "../FormNextButton";

const FormPageThree = (props) => {
    const [selectedInput, setSelectedInput] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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
            <div className="grid grid-cols-1 gap-6 px-2 sm:px-0 mb-5 md:grid-cols-2">
                {ac_data.map(e => <RadioInput key={e.value} value={e.value} label={e.status}
                                              isChecked={selectedInput === e.value}
                                              handleChange={handleChange}/>)}
            </div>

            {props.errorMessage !== "" &&
            <h3 className="font-bold text-center text-red-500 text-lg">{props.errorMessage}</h3>
            }
            <div className="mt-5 flex flex-row space-x-4">
                <FormBackButton clickHandler={props.previousStep}/>
                <FormNextButton loading={props.loading} label="Submit" handleClick={props.handleSubmit}/>
            </div>
        </>
    );
}

export default FormPageThree;