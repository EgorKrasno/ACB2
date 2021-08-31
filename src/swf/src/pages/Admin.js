const Admin = () => {

    return (
        <div className="rounded-3xl flex flex-col h-full w-1/2 self-center py-4 m-8"
             style={{backgroundColor: "#171727"}}>
            <div className="flex justify-between pt-1 pb-2 pl-5">
                <h1 className="text-gray-200 text-2xl font-semibold">Overview</h1>
                <h1 className="text-gray-200 text-md px-5">Filter v</h1>
            </div>

                <table className="min-w-full leading-normal">
                    <thead>
                    <tr>
                        <th scope="col"
                            className="px-5 py-3 border-b border-gray-500 text-gray-200 text-left text-sm uppercase font-normal">
                            Name
                        </th>
                        <th scope="col"
                            className="px-5 py-3 border-b border-gray-500 text-gray-200 text-left text-sm uppercase font-normal">
                            COVID Status
                        </th>
                        <th scope="col"
                            className="px-5 py-3 border-b border-gray-500 text-gray-200 text-left text-sm uppercase font-normal">
                            Status
                        </th>
                        <th scope="col"
                            className="px-5 py-3 border-b border-gray-500 text-gray-200 text-left text-sm uppercase font-normal">
                            Time
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="px-5 py-5 text-sm">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <a href="#" className="block relative">
                                        <img alt="profile"
                                             src="https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg"
                                             className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                    </a>
                                </div>
                                <div className="ml-3">
                                    <p className="text-gray-200 whitespace-no-wrap">
                                        Egor Kras
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td className="px-5 py-5 text-sm">
                                <span
                                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span aria-hidden="true"
                                          className="absolute inset-0 bg-green-400 rounded-full">
                                    </span>
                                    <span className="relative">
                                        Good
                                    </span>
                                </span>
                        </td>
                        <td className="px-5 py-5 text-sm">
                                <span
                                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span aria-hidden="true"
                                          className="absolute inset-0 bg-green-400 rounded-full">
                                    </span>
                                    <span className="relative">
                                        Present
                                    </span>
                                </span>
                        </td>
                        <td className="px-5 py-5 text-sm">
                                <span
                                    className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                    <span aria-hidden="true"
                                          className="absolute inset-0 bg-red-400 rounded-full">
                                    </span>
                                    <span className="relative">
                                        10:38 PM
                                    </span>
                                </span>
                        </td>
                    </tr>
                    </tbody>
                </table>

        </div>
    );
};

export default Admin;