import UserRow from "../components/UserRow";
import {useEffect, useState} from "react";
import {getTodaysStatus} from "../services/Service";

const Admin = () => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getTodaysStatus()
                const userList = await response.json();
                setUserList(userList)
                console.log(userList)
            } catch (err) {
                const response = await err.json();
                console.log(response.message)
            }
        }

        fetchData();
    }, [])

    return (
        <div className="container mx-auto max-w-2xl">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-xl overflow-hidden"
                     style={{backgroundColor: "#171727"}}>
                    <h1 className="text-white px-8 pt-5 pb-2 font-bold text-2xl tracking-wide">Today</h1>
                    <table className="min-w-full leading-normal">
                        <thead>
                        <tr>
                            <th scope="col"
                                className="px-8 py-3 border-b border-gray-500 text-gray-200 text-left text-sm uppercase font-normal">
                                Name
                            </th>
                            <th scope="col"
                                className="px-8 py-3 border-b border-gray-500 text-gray-200 text-left text-sm uppercase font-normal">
                                COVID Status
                            </th>
                            <th scope="col"
                                className="px-8 py-3 border-b border-gray-500 text-gray-200 text-left text-sm uppercase font-normal">
                                Status
                            </th>
                            <th scope="col"
                                className="px-8 py-3 border-b border-gray-500 text-gray-200 text-left text-sm uppercase font-normal">
                                Time
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {userList.length > 1 ? userList.map(user => <UserRow key={user.name} user={user}/>) : null}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin;