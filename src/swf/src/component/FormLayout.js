const FormLayout = ({errorMessage, label, children}) => {

    return (
        <div className="flex flex-col flex-1  h-screen">
            <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="px-10 py-10 border-2 border-purple-800 border-opacity-50 rounded-3xl w-full"
                     style={{backgroundColor: "#171727"}}>
                    <h1 className="mb-5 text-5xl font-medium text-yellow-400 text-center">{label}</h1>
                    {errorMessage !== "" &&
                    <h3 className="text-red-500 text-md">{errorMessage}</h3>
                    }
                    {children}
                </div>
            </div>
        </div>
    );
}

export default FormLayout;