import UserRow from "../components/UserRow";
import {useEffect, useState} from "react";
import {getTodaysStatus} from "../services/Service";
import BlobLoader from "../components/BlobLoader";

const Admin = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
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

        fetchData();
    }, [])

    return (
        <>
            {!loading ?
                <div className="flex justify-center space-x-8 space-y-8">
                    {/*Main Stack*/}
                    <div className="container max-w-2xl">
                        <div className="container flex max-w-2xl my-8 space-x-8">
                            <div className="container w-full bg-primary shadow rounded-xl h-40">

                            </div>
                            <div className="w-full bg-primary shadow rounded-xl h-40">

                            </div>
                        </div>
                        {/* Today Dashboard */}
                        <div className="max-w-2xl overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-xl bg-primary overflow-hidden">
                                <h1 className="text-white px-8 pt-5 font-bold text-2xl tracking-wide">Today</h1>
                                <div className="flex border-b border-gray-600 py-3">
                                    <h3 className="w-2/5 pl-8 text-sm uppercase text-white">Name</h3>
                                    <h3 className="w-1/5 pl-3 text-sm uppercase text-white">Covid Status</h3>
                                    <h3 className="w-1/5 text-sm uppercase text-white">Status</h3>
                                    <h3 className="w-1/5 text-sm uppercase text-white">Time </h3>
                                </div>

                                {userList.length > 0 ?
                                    <div className="h-96 overflow-y-scroll">
                                        <table className="min-w-full leading-normal">
                                            <tbody>
                                            {userList.map(user => <UserRow key={user.name} user={user}/>)}
                                            </tbody>
                                        </table>
                                    </div> : <div className="h-96 flex items-center justify-center"><h1
                                        className="text-white text-xl">No check ins yet</h1></div>
                                }
                            </div>
                        </div>
                    </div>
                    {/* Right Side Stack */}
                    <div className="w-80 bg-primary shadow rounded-xl">

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