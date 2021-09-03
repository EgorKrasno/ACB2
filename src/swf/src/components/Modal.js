import {Dialog, Transition} from '@headlessui/react'
import {Fragment} from 'react'

const Modal = ({isOpen, setIsOpen, modalAction}) => {

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={setIsOpen}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-69"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-70"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-70"/>
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
              &#8203;
            </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-primary shadow-lg shadow-md rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-center text-lg font-medium leading-6 text-gray-100"
                                >
                                    Are you sure you want to logout?
                                </Dialog.Title>
                                {/*<div className="mt-2">*/}
                                {/*    <p className="text-sm text-gray-300">*/}
                                {/*        Your payment has been successfully submitted. We’ve sent*/}
                                {/*        your an email with all of the details of your order.*/}
                                {/*    </p>*/}
                                {/*</div>*/}

                                <div className="mt-4 space-x-6 flex justify-center">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary border-2 rounded-md border-purple-600 hover:border-yellow-400 focus:outline-none"
                                        onClick={() => {
                                            modalAction(true);
                                            setIsOpen(false);
                                        }}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-100 bg-primary border-2 rounded-md border-purple-600 hover:border-yellow-400 focus:outline-none"
                                        onClick={() => {
                                            modalAction(false);
                                            setIsOpen(false)
                                        }}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Modal;