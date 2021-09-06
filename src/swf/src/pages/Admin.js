import UserRow from "../components/UserRow";
import {useEffect, useState} from "react";
import {getTodaysStatus} from "../services/Service";
import BlobLoader from "../components/BlobLoader";
import {HiOutlineRefresh} from "react-icons/all";

const Admin = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await fetchCheckInData();
        }

        fetchData();
    }, [])

    const fetchCheckInData = async () => {
        setLoading(true);
        try {
            const response = await getTodaysStatus()
            const data = await response.json();
            setUserList(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {!loading ?
                <div
                    className="flex flex-col sm:flex-row justify-center sm:space-x-8 space-y-4 sm:h-screen sm:-mt-20 sm:pt-16 pb-8 sm:mx-8">
                    {/*Main Stack*/}
                    <div className="container max-w-2xl flex flex-col">
                        <div className="container flex max-w-2xl mb-8 mt-4 space-x-8">
                            <div className="container w-full bg-primary shadow rounded-xl h-40">

                            </div>
                            <div className="w-full bg-primary shadow rounded-xl h-40">

                            </div>
                        </div>
                        {/* Today Dashboard */}
                        <div className="max-w-2xl overflow-x-auto flex sm:flex-col">
                            <div
                                className="inline-block min-w-full shadow rounded-xl bg-primary flex flex-col overflow-hidden">
                                <div className="flex flex-row justify-between items-center mx-4 sm:mx-8 mt-4">
                                    <h1 className="text-white font-bold text-2xl tracking-wide">Today</h1>
                                    <div
                                        onClick={fetchCheckInData}
                                        className="text-purple-600 hover:text-yellow-400 transition duration-100 ease-out p-2">
                                        <HiOutlineRefresh size={26}/>
                                    </div>
                                </div>
                                <div className="flex border-b border-gray-600 py-2">
                                    <h3 className="w-2/5 pl-4 sm:pl-8 text-sm uppercase text-white">Name</h3>
                                    <h3 className="w-1/5 pl-3 text-sm uppercase text-white">Covid</h3>
                                    <h3 className="w-1/5 text-sm uppercase text-white">Status</h3>
                                    <h3 className="w-1/5 text-sm uppercase text-white">Time </h3>
                                </div>

                                {userList.length > 0 ?
                                    <div className="flex flex-col overflow-hidden">
                                        <div className="overflow-y-auto">
                                            <table className="min-w-full leading-normal">
                                                <tbody>
                                                {userList.map(user => <UserRow key={user.name} user={user}/>)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> : <div className="h-96 flex items-center justify-center"><h1
                                        className="text-white text-xl">No check ins yet</h1></div>
                                }
                            </div>
                        </div>
                    </div>
                    {/* Right Side Stack */}
                    <div className="w-94 sm:w-72 bg-primary shadow rounded-xl px-8 py-6">
                        <div className="w-full flex items-center justify-between mb-8">
                            <p className="text-gray-200 text-2xl font-semibold">
                                Activity
                            </p>
                        </div>
                        <div className="flex items-start mb-6 rounded justify-between">
                            <div className="block relative">
                                <div
                                    className="rounded-full h-11 w-11 border-solid border-2 border-purple-500"/>

                                <div className="absolute inset-0 flex justify-center items-center z-10">
                                    <h3 className="text-white text-lg font-semibold tracking-wider">EK</h3>
                                </div>
                            </div>
                            <div/>
                            <div className="flex items-center flex-1 justify-between">
                                <div className="flex text-sm flex-col w-full ml-2 items-start justify-between">
                                    <p className="text-gray-200">
                                        <span className="font-bold mr-1">
                                            Egor
                                        </span>
                                        Checked in
                                    </p>
                                    <p className="text-gray-400">
                                        08:35
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                : <BlobLoader/>
            }
        </>

    );
};

// <div className="flex flex-row justify-center w-full">
//     <h1 className="text-white font-semibold text-lg">No check ins
//         yet </h1>
// </div>

export default Admin;