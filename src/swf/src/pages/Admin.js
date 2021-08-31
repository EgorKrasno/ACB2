import UserRow from "../components/Dashboard/UserRow";
import {useEffect} from "react";
import {getTodaysStatus} from "../services/Service";

const Admin = () => {

    useEffect(()=>{
        async function fetchData(){
            try {
                const response = await getTodaysStatus()
                const userList = await response.json();
                console.log(userList)
            } catch(err){
                const response = await err.json();
                console.log(response.message)
            }
        }
        fetchData();
    },[])



    return (
        <div className="rounded-3xl flex flex-col h-full w-1/2 self-center py-4 m-8"
             style={{backgroundColor: "#171727"}}>
            <div className="flex justify-between pt-1 pb-2 pl-8">
                <h1 className="text-white text-2xl font-semibold">Overview</h1>
                <h1 className="text-gray-200 text-md px-8">Filter v</h1>
            </div>

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
                        <UserRow />
                    </tbody>
                </table>

        </div>
    );
};

export default Admin;