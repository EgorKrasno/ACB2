
const UserRow = () => {

    return(
        <tr>
            <td className="px-8 py-5 text-sm">
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
            <td className="px-8 py-5 text-sm">
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
            <td className="px-8 py-5 text-sm">
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
            <td className="px-8 py-5 text-sm">
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
    );
}

export default UserRow;