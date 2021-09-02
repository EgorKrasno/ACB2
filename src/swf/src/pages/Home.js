import {useEffect, useState} from "react";
import StepWizard from "react-step-wizard";
import FormPageOne from "../components/form-pages/FormPageOne";
import FormPageTwo from "../components/form-pages/FormPageTwo";
import "animate.css"
import FormPageThree from "../components/form-pages/FormPageThree";
import {isCheckedIn, saveCheckIn} from "../services/Service";
import CheckedIn from "../components/CheckedIn";
import BlobLoader from "../components/BlobLoader";

const Home = ({user}) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [checkedIn, setCheckedIn] = useState(false);
    const [results, setResults] = useState({
        questionOne: "",
        questionTwo: "",
        questionThree: "",
        questionFour: "",
        ac: ""
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await isCheckedIn();
                const data = await result.json();
                setCheckedIn(data);
            } catch (e) {
                console.log(await e.json());
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])


    const handleSubmit = async () => {
        if (
            results.ac !== "" &&
            results.questionOne !== "" &&
            results.questionTwo !== "" &&
            results.questionThree !== "" &&
            results.questionFour !== ""
        ) {
            setLoading(true);
            setErrorMessage("");
            try {
                await saveCheckIn(results);
                setCheckedIn(true);
            } catch (err) {
                const response = await err.json();
                setErrorMessage(response.message);
            } finally {
                setLoading(false);
            }
        } else {
            setErrorMessage("Please answer all questions to submit.")
        }
    }

    let customAnim = {
        enterRight: 'animate__animated animate__fadeInRight animate__faster',
        enterLeft: 'animate__animated animate__fadeInLeft animate__faster',
        exitRight: 'animate__animated animate__fadeOutRight animate__faster',
        exitLeft: 'animate__animated animate__fadeOutLeft animate__faster',
        intro: '',
    };

    return (
        <>
            {/*<div className="origin-top-right absolute right-0 mt-20 mr-14 border-2 rounded-xl border-red-600 text-red-500 p-4" style={{backgroundColor: "#171727"}}  role="alert" >*/}
            {/*    <p className="font-bold">Warning</p>*/}
            {/*    <p >Something not ideal might be happening.</p>*/}
            {/*</div>*/}
            <div className="flex flex-col flex-1 mb-6 mx-6">
                <div className="container max-w-2xl mx-auto flex-1 flex flex-col items-center mt-2 sm:mt-32">
                    {loading ? <BlobLoader/> :
                        checkedIn ? <CheckedIn user={user} setCheckIn={() => setCheckedIn(false)}/> :
                            <>
                                <h1 className="text-yellow-400 text-center text-5xl mb-8 font-medium capitalize animate__animated animate__jackInTheBox">Good
                                    Morning {user.firstName}</h1>
                                <StepWizard transitions={customAnim} style={{backgroundColor: "#171727"}}
                                            className="overflow-hidden px-6 sm:px-12 py-6 border-2 border-purple-700 border-opacity-50 rounded-3xl">
                                    <FormPageOne results={results} setResults={setResults}/>
                                    <FormPageTwo results={results} setResults={setResults}/>
                                    <FormPageThree results={results} setResults={setResults}
                                                   handleSubmit={handleSubmit}
                                                   loading={loading} errorMessage={errorMessage}/>
                                </StepWizard>
                            </>
                    }
                </div>
            </div>

        </>
    );
}
export default Home;