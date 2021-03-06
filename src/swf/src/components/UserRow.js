const UserRow = ({user}) => {


    const isLate = () => {
        if (user.checkInTime === null) {
            return "text-red-900 bg-red-400"
        } else {
            let sp = user.checkInTime.split(':');
            let hours = parseInt(sp[0], 10);
            let mins = parseInt(sp[1], 10);

            if (hours > 8 || (hours === 8 && mins > 45)) {
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

    //I have to do this because my long last name literally breaks the mobile interface on small phones
    const nameBuilder = () => {
        let nameSplit = user.name.split(' ');
        let firstName = nameSplit[0];
        let lastName = nameSplit[1];
        if (lastName.length > 12) {
            lastName = nameSplit[1].substring(0,12) + '...'
        }
        return firstName + ' ' + lastName;
    }


    return (
        <tr>
            <td className="pl-4 sm:pl-8 py-4 text-sm w-2/5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <a href="www.google.com" className="block relative">
                            <div
                                className="mx-auto rounded-full h-11 w-11 border-solid border-2 border-purple-500"/>
                            <div className="absolute inset-0 flex justify-center items-center z-10">
                                <h3 className="text-white text-lg font-semibold tracking-wider">{profileLetters()}</h3>
                            </div>
                            <div/>
                        </a>
                    </div>
                    <div className="ml-3 w-1/2">
                        <p className="text-gray-200 whitespace-no-wrap capitalize">
                            {nameBuilder()}
                        </p>
                    </div>
                </div>
            </td>
            <td className="py-5 text-sm w-1/5 pl-3">
                                <span
                                    className={`relative inline-block rounded-full py-1 font-semibold leading-tight ${isCovid()}`}>
                                    <span className="relative">
                                        {user.covidStatus !== null ? user.covidStatus : "N/A"}
                                    </span>
                                </span>
            </td>
            <td className="py-5 text-sm w-1/5">
                                <span
                                    className={`relative inline-block rounded-full py-1 font-semibold leading-tight ${isEmergency()}`}>
                                    <span className="relative">
                                        {user.acStatus !== null ? user.acStatus : "N/A"}
                                    </span>
                                </span>
            </td>
            <td className="py-5 text-sm w-1/5">
                                <span
                                    className={`relative inline-block rounded-full px-1.5 sm:px-3 text-gray-200 py-1 font-semibold leading-tight ${isLate()}`}>
                                    <span className="relative">
                                        {user.checkInTime !== null ? user.checkInTime.slice(0,5) : "N/A"}
                                    </span>
                                </span>
            </td>
        </tr>
    );
}
export default UserRow;