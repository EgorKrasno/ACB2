const FormLayout = ({errorMessage, label, children}) => {
    return (
        <div className="flex flex-col flex-1">
            <div className="container max-w-md mx-auto flex-1 flex flex-col items-center mt-8 sm:mt-32 px-2">
                <div className="px-10 py-10 border-2 border-purple-800 border-opacity-50 rounded-3xl w-full bg-primary">
                    <h1 className="mb-10 text-5xl font-medium text-yellow-400 text-center">{label}</h1>
                    {errorMessage !== "" &&
                    <h3 data-testid="error" className="text-red-500 text-md">{errorMessage}</h3>
                    }
                    {children}
                </div>
            </div>
        </div>
    );
}
export default FormLayout;