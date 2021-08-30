import Question from "../Question";
import FormNextButton from "../FormNextButton";

const FormPageOne = (props) => {

    return (
        <div>
            <h1 className="text-white font-medium text-3xl text-center mb-6">COVID Status</h1>
            <Question handleQuestion={(result) => props.setResults({...props.results, questionOne: result})} question="Have you tested positive for COVID-19 in the past 14
                                days?"/>

            <Question handleQuestion={(result) => props.setResults({...props.results, questionTwo: result})} question="Do you currently exhibit any symptoms of COVID-19
                                days?" questionInfo="eg., fever, cough, shortness of
                                breath, chills, diarrhea, muscle pain, headache, sore throat, loss of taste and/or
                                smell"/>
            <FormNextButton label="Next" handleClick={props.nextStep}/>
        </div>
    );
}

export default FormPageOne;