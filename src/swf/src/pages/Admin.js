import UserRow from "../components/UserRow";
import {useEffect, useState} from "react";
import {getTodaysStatus} from "../services/Service";

const Admin = () => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        // async function fetchData() {
        //     try {
        //         const response = await getTodaysStatus()
        //         const userList = await response.json();
        //         setUserList(userList)
        //         console.log(userList)
        //     } catch (err) {
        //         const response = await err.json();
        //         console.log(response.message)
        //     }
        // }
        //
        // fetchData();
        setUserList([{
            name: "Egor Kras",
            acStatus: "Present",
            covidStatus: "Good",
            url: "https://picsum.photos/seed/testf/200/300",
            time: "08:34"
        },
            {
                name: "Bob Hall",
                acStatus: "Leave",
                covidStatus: "Good",
                url: "https://picsum.photos/seed/asdfas/200/300",
                time: "05:12"
            },
            {
                name: "Joe Goodwin",
                acStatus: "Present",
                covidStatus: "Good",
                url: "https://picsum.photos/seed/sklfgs/200/300",
                time: "08:46"
            },
            {
                name: "Deborah Glover",
                acStatus: "Present",
                covidStatus: "Good",
                url: "https://picsum.photos/seed/asdfasdf/200/300",
                time: "08:45"
            },
            {
                name: "Andy Rankin",
                acStatus: "TELEWORK",
                covidStatus: "Bad",
                url: "https://picsum.photos/seed/qsdhbb/200/300",
                time: "10:34"
            },
            {
                name: "Columbus Buckner",
                acStatus: "Emergency",
                covidStatus: "Good",
                url: "https://picsum.photos/seed/sdfhjh/200/300",
                time: "07:34"
            },
            {
                name: "Greg Duck",
                acStatus: null,
                covidStatus: null,
                url: "https://picsum.photos/seed/klgng/200/300",
                time: null
            },
            {
                name: "Rob Heinz",
                acStatus: null,
                covidStatus: null,
                url: "https://picsum.photos/seed/gfsag/200/300",
                time: null
            },
            {
                name: "Joe Joe",
                acStatus: null,
                covidStatus: null,
                url: "https://picsum.photos/seed/klhghjgng/200/300",
                time: null
            },
            {
                name: "Joe Welt",
                acStatus: null,
                covidStatus: null,
                url: "https://picsum.photos/seed/hsdfgg/200/300",
                time: null
            },
        ])
    }, [])


    return (
        <div className="container mx-auto max-w-2xl">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-xl overflow-hidden"
                     style={{backgroundColor: "#171727"}}>
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