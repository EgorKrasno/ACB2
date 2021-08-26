import {useState} from "react";
import {saveCheckIn} from "../services/Service";
import Question from "../component/Question";

const Home = ({user}) => {
    const [results, setResults] = useState(
        {
            questionOne: "",
            questionTwo: "",
            questionThree: "",
            questionFour: ""
        });

    const handleClick = async () => {
        try {
            const response = await saveCheckIn(results);
            const data = await response.json();
            console.log(data);
        } catch (err){
            console.error(err.error);
        }
    }

    return (
        <div className="flex flex-col flex-1 h-screen">
            <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center">
                <h1 className="text-white text-6xl mb-8 font-medium capitalize" >Good Morning {user.firstName}</h1>
                <div className="px-12 py-6 border-2 border-purple-800 border-opacity-50 rounded-3xl w-full"
                     style={{backgroundColor: "#171727"}}>
                    <h1 className="text-white font-medium text-3xl text-center mb-6">COVID Status</h1>

                    <div className="space-y-14">
                        <Question handleQuestion={(result) => setResults({...results, questionOne: result})} question="Have you tested positive for COVID-19 in the past 14
                                days?"/>

                        <Question handleQuestion={(result) => setResults({...results, questionTwo: result})} question="Do you currently exhibit any symptoms of COVID-19
                                days?" questionInfo="eg., fever, cough, shortness of
                                breath, chills, diarrhea, muscle pain, headache, sore throat, loss of taste and/or
                                smell"/>

                        <Question handleQuestion={(result) => setResults({...results, questionThree: result})}
                                  question="Have you been in contact with anyone who has tested
                                positive for COVID-19 in the past 14 days?" questionInfo="Exposure: In close contact (within 6
                                feet) with the individual for at least 15 minutes or more over a 24 hour period."/>

                        <Question handleQuestion={(result) => setResults({...results, questionFour: result})} question="I understand and I must stay home if I exhibit any
                                symptoms of COVID-19 or have tested positive for COVID in the past 14 days."/>


                    </div>
                    <button
                        className="w-full text-center font-medium py-3 rounded-3xl text-white focus:outline-none mt-16 bg-gradient-to-r from-pink-500 to-purple-500"
                        onClick={() => handleClick()}
                    >Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Home;