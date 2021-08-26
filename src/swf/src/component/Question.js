import {useState} from "react";

const Question = ({question, questionInfo, handleQuestion}) => {
    const [questionYes, setQuestionYes] = useState(false);
    const [questionNo, setQuestionNo] = useState(false);

    return (
        <div>
            <h1 className="text-white text-lg">{question}</h1>
            {questionInfo !== null &&
            <h1 className="text-white text-sm text-gray-400 mt-0.5">{questionInfo}</h1>}
            <div className="flex space-x-8">
                <div
                    onClick={() => {
                        setQuestionYes(false);
                        setQuestionNo(true);
                        handleQuestion("y");
                    }}
                    className={`flex-auto text-center font-medium py-3 rounded-3xl text-white mt-5 rounded-md text-white focus:outline-none border-4 cursor-pointer hover:border-red-500 ${questionNo ? "border-red-500" : "border-purple-900"}`}
                >Yes
                </div>
                <div
                    onClick={() => {
                        setQuestionYes(true);
                        setQuestionNo(false);
                        handleQuestion("n");
                    }}
                    className={`flex-auto text-center font-medium py-3 rounded-3xl text-white mt-5 rounded-md text-white focus:outline-none border-4 cursor-pointer hover:border-green-500 ${questionYes ? "border-green-500" : "border-purple-900"}`}
                >No
                </div>
            </div>
        </div>
    );
}

export default Question;