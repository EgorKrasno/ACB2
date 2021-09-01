import Loader from "react-loader-spinner";

const BlobLoader = () => <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <Loader color="#7c40ff" secondaryColor="#FBBF24" type="MutatingDots" height={150} width={150}/>
    <h1 className="text-yellow-400 text-3xl font-semibold tracking-wide">Loading</h1>
</div>

export default Loader;