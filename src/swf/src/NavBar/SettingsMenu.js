import {Menu, Transition} from "@headlessui/react";
import {FiLogOut, FiSettings, FiUser} from "react-icons/fi";
import {Fragment} from "react";

const SettingsMenu = ({handleLogout}) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button as="div" className="cursor-pointer"><FiSettings
                className="text-gray-500 hover:text-yellow-400 focus-outline-none"
                size={24}/></Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    style={{backgroundColor: "#171727"}}
                    className="absolute right-0 w-52 mt-5 px-4 origin-top-right divide-y divide-purple-900 divide-opacity-75 rounded-lg shadow-md focus:outline-none border border-purple-900 border-opacity-75">

                    <Menu.Item as="div">
                        {({active}) => (

                            <button
                                onClick={() => alert("Account page would go here if I had one")}
                                className={`${
                                    active ? 'text-yellow-400' : 'text-gray-100'
                                } group flex rounded-md items-center w-full py-2 text-base`}
                            >
                                <FiUser className="mr-3"/>
                                Account
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item as="div">
                        {({active}) => (
                            <button
                                onClick={handleLogout}
                                className={`${
                                    active ? 'text-yellow-400' : 'text-gray-100'
                                } group flex rounded-md items-center w-full py-2.5 text-base`}
                            >
                                <FiLogOut className="mr-3"/>
                                Logout
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>

        </Menu>
    );
}

export default SettingsMenu;