const Home = () => {
    return (
        <div className="flex flex-col flex-1 h-screen">
            <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center">
                <h1 className="text-white text-6xl mb-8 font-medium">Good Morning Egor</h1>
                <div className="px-12 py-6 border-2 border-purple-800 border-opacity-50 rounded-3xl w-full"
                     style={{backgroundColor: "#171727"}}>
                    <h1 className="text-white font-medium text-3xl text-center mb-6">COVID Status</h1>
                    <div className="space-y-14">
                        <div>
                            <h1 className="text-white text-lg">Have you tested positive for COVID-19 in the past 14
                                days?</h1>
                            <div className="flex space-x-8">
                                <div
                                    className="flex-auto text-center font-medium py-3 rounded-3xl text-white mt-5 rounded-md text-white focus:outline-none border-4 border-purple-800 border-opacity-50 hover:border-red-500 cursor-pointer"
                                >Yes
                                </div>
                                <div
                                    className="flex-auto text-center font-medium py-3 rounded-3xl text-white mt-5 rounded-md text-white focus:outline-none border-4 border-purple-800 border-opacity-50 hover:border-green-500 cursor-pointer"
                                >No
                                </div>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-white text-lg">Do you currently exhibit any symptoms of COVID-19
                                days?</h1>
                            <h1 className="text-white text-sm text-gray-400 mt-0.5">eg., fever, cough, shortness of
                                breath, chills, diarrhea, muscle pain, headache, sore throat, loss of taste and/or
                                smell</h1>
                            <div className="flex space-x-8">
                                <div
                                    className="flex-auto text-center font-medium py-3 rounded-3xl text-white mt-5 rounded-md text-white focus:outline-none border-4 border-purple-800 border-opacity-50 hover:border-red-500 cursor-pointer"
                                >Yes
                                </div>
                                <div
                                    className="flex-auto text-center font-medium py-3 rounded-3xl text-white mt-5 rounded-md text-white focus:outline-none border-4 border-purple-800 border-opacity-50 hover:border-green-500 cursor-pointer"
                                >No
                                </div>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-white text-lg">Have you been in contact with anyone who has tested
                                positive for COVID-19 in the past 14 days?</h1>
                            <h1 className="text-white text-sm text-gray-400 mt-0.5">Exposure: In close contact (within 6
                                feet) with the individual for at least 15 minutes or more over a 24 hour period.</h1>
                            <div className="flex space-x-8">
                                <div
                                    className="flex-auto text-center font-medium py-3 rounded-3xl text-white mt-5 rounded-md text-white focus:outline-none border-4 border-purple-800 border-opacity-50 hover:border-red-500 cursor-pointer"
                                >Yes
                                </div>
                                <div
                                    className="flex-auto text-center font-medium py-3 rounded-3xl text-white mt-5 rounded-md text-white focus:outline-none border-4 border-purple-800 border-opacity-50 hover:border-green-500 cursor-pointer"
                                >No
                                </div>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-white text-lg">I understand and I must stay home if I exhibit any
                                symptoms of COVID-19 or have tested positive for COVID in the past 14 days.</h1>
                            <div className="flex space-x-8">
                                <div
                                    className="flex-auto text-center font-medium py-3 rounded-3xl text-white mt-5 rounded-md text-white focus:outline-none border-4 border-purple-800 border-opacity-50 hover:border-red-500 cursor-pointer"
                                >Yes
                                </div>
                                <div
                                    className="flex-auto text-center font-medium py-3 rounded-3xl text-white mt-5 rounded-md text-white focus:outline-none border-4 border-purple-800 border-opacity-50 hover:border-green-500 cursor-pointer"
                                >No
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full text-center font-medium py-3 rounded-3xl text-white focus:outline-none mt-5 bg-gradient-to-r from-pink-500 to-purple-500"
                        >Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;