const UserRow = ({user}) => {


    const isLate = () => {
        if (user.checkInTime === null) {
            return "text-red-900 bg-red-400"
        } else {
            let sp = user.checkInTime.split(':');
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
            return "text-yellow-600";
        } else if (user.covidStatus === "Good") {
            return "text-gray-200"
        } else {
            return "text-red-500"
        }

    };
    const isEmergency = () => {
        if (user.acStatus === null) {
            return "text-red-500";
        } else if (user.acStatus === "Emergency") {
            return "text-yellow-500";
        } else {
            return "text-gray-200";
        }
    };

    const profileLetters = () => {
        let sp = user.name.split(' ');
        return sp[0].charAt(0).toUpperCase() + sp[1].charAt(0).toUpperCase();
    }


    return (
        <tr>
            <td className="px-8 py-5 text-sm">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <a href="#" className="block relative">
                            <div
                                className="mx-auto rounded-full h-11 w-11 border-solid border-2 border-purple-500"/>
                            <div className="absolute inset-0 flex justify-center items-center z-10">
                                <h3 className="text-white text-lg font-semibold tracking-wider">{profileLetters()}</h3>
                            </div>
                            <div/>
                        </a>
                    </div>
                    <div className="ml-3">
                        <p className="text-gray-200 whitespace-no-wrap capitalize">
                            {user.name}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-8 py-5 text-sm">
                                <span
                                    className={`relative inline-block rounded-full py-1 font-semibold leading-tight ${isCovid()}`}>
                                    <span className="relative">
                                        {user.covidStatus !== null ? user.covidStatus : "N/A"}
                                    </span>
                                </span>
            </td>
            <td className="px-8 py-5 text-sm">
                                <span
                                    className={`relative inline-block rounded-full py-1 font-semibold leading-tight ${isEmergency()}`}>
                                    <span className="relative">
                                        {user.acStatus !== null ? user.acStatus : "N/A"}
                                    </span>
                                </span>
            </td>
            <td className="px-8 py-5 text-sm">
                                <span
                                    className={`relative inline-block rounded-full px-3 text-gray-200 py-1 font-semibold leading-tight ${isLate()}`}>
                                    <span className="relative">
                                        {user.checkInTime !== null ? user.checkInTime.slice(0,5) : "N/A"}
                                    </span>
                                </span>
            </td>
        </tr>
    );
}
export default UserRow;