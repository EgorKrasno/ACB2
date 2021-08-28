import {useState} from "react";
import {saveCheckIn} from "../services/Service";
import StepWizard from "react-step-wizard";
import FormPageOne from "../component/form-pages/FormPageOne";
import FormPageTwo from "../component/form-pages/FormPageTwo";
import "animate.css"
import FormPageThree from "../component/form-pages/FormPageThree";

const Home = ({user}) => {
    const [results, setResults] = useState(
        {
            questionOne: "",
            questionTwo: "",
            questionThree: "",
            questionFour: "",
            ac: ""
        });


    //put async back when done testing log
    const handleSubmit =  () => {
        // try {
        //     const response = await saveCheckIn(results);
        //     const data = await response.json();
        //     console.log(data);
        // } catch (err) {
        //     console.error(err.error);
        // }
        console.log(results);
    }

    let customAnim = {
        enterRight: 'animate__animated animate__fadeInRight animate__faster',
        enterLeft: 'animate__animated animate__fadeInLeft animate__faster',
        exitRight: 'animate__animated animate__fadeOutRight animate__faster',
        exitLeft: 'animate__animated animate__fadeOutLeft animate__faster',
        intro: '',
    };

    return (
        <div className="flex flex-col flex-1 h-screen mb-8">
            <div className="container max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center">
                <h1 className="text-yellow-400 text-center text-5xl mb-8 font-medium capitalize animate__animated animate__jackInTheBox">Good Morning {user.firstName}</h1>
                    <StepWizard transitions={customAnim} style={{backgroundColor: "#171727"}} className="overflow-hidden px-12  py-6 border-2 border-purple-700 border-opacity-50 rounded-3xl">
                        <FormPageOne results={results} setResults={setResults} />
                        <FormPageTwo results={results} setResults={setResults}/>
                        <FormPageThree results={results} setResults={setResults} handleSubmit={handleSubmit}/>
                    </StepWizard>

            </div>
        </div>
    );
}
export default Home;