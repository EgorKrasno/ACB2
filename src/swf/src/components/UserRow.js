const UserRow = ({user}) => {


    const isLate = () => {
        if (user.time === null) {
            return "text-red-900 bg-red-400"
        } else {
            let sp = user.time.split(':');
            let hours = parseInt(sp[0], 10);
            let mins = parseInt(sp[1], 10);

            if (hours > 8 || (hours === 8 && mins >= 46)) {
                return "text-yellow-900 bg-yellow-400";
            } else {
                return "text-green-900 bg-green-400";
            }
        }
    }

    const isCovid = () => {
        if (user.covidStatus === "Bad") {
            return "text-yellow-900 bg-yellow-400";
        } else if (user.covidStatus === "Good") {
            return "text-green-900 bg-green-400"
        } else {
            return "text-red-900 bg-red-400"
        }

    };
    const isEmergency = () => {
        if (user.acStatus === null) {
            return "text-red-900 bg-red-400";
        } else if (user.acStatus === "Emergency") {
            return "text-yellow-900 bg-yellow-400";
        } else {
            return "text-green-900 bg-green-400";
        }
    };


    return (
        <tr>
            <td className="px-8 py-5 text-sm">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <a href="#" className="block relative">
                            <img alt="profile"
                                 src={user.url}
                                 className="mx-auto object-cover rounded-full h-10 w-10 "/>
                        </a>
                    </div>
                    <div className="ml-3">
                        <p className="text-gray-200 whitespace-no-wrap">
                            {user.name}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-8 py-5 text-sm">
                                <span
                                    className={`relative inline-block px-3 rounded-full py-1 font-semibold leading-tight ${isCovid()}`}>
                                    <span aria-hidden="true"
                                          className={`absolute inset-0 rounded-full`}>
                                    </span>
                                    <span className="relative">
                                        {user.covidStatus !== null ? user.covidStatus : "N/A"}
                                    </span>
                                </span>
            </td>
            <td className="px-8 py-5 text-sm">
                                <span
                                    className={`relative inline-block px-3 rounded-full py-1 font-semibold leading-tight ${isEmergency()}`}>
                                    <span aria-hidden="true"
                                          className={`absolute inset-0 rounded-full`}>
                                    </span>
                                    <span className="relative">
                                        {user.acStatus !== null ? user.acStatus : "N/A"}
                                    </span>
                                </span>
            </td>
            <td className="px-8 py-5 text-sm">
                                <span
                                    className={`relative inline-block px-3 rounded-full py-1 font-semibold leading-tight ${isLate()}`}>
                                    <span aria-hidden="true"
                                          className={`absolute inset-0 rounded-full`}>
                                    </span>
                                    <span className="relative">
                                        {user.time !== null ? user.time : "N/A"}
                                    </span>
                                </span>
            </td>
        </tr>
    );
}
export default UserRow;