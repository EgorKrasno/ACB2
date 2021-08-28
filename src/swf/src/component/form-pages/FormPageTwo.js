import Question from "../Question";
import FormBackButton from "../FormBackButton";
import FormNextButton from "../FormNextButton";

const FormPageTwo = (props) => {
    return (
        <div>
            <h1 className="text-white font-medium text-3xl text-center mb-6">COVID Status</h1>
            <Question handleQuestion={(result) => props.setResults({...props.results, questionThree: result})}
                      question="Have you been in contact with anyone who has tested
                                positive for COVID-19 in the past 14 days?" questionInfo="Exposure: In close contact (within 6
                                feet) with the individual for at least 15 minutes or more over a 24 hour period."/>

            <Question handleQuestion={(result) => props.setResults({...props.results, questionFour: result})} question="I understand and I must stay home if I exhibit any
                                symptoms of COVID-19 or have tested positive for COVID in the past 14 days."/>
            <div className="flex flex-row space-x-4">
                <FormBackButton clickHandler={props.previousStep}/>
                <FormNextButton label="Next" handleClick={props.nextStep}/>
            </div>
        </div>
    );
}

export default FormPageTwo;