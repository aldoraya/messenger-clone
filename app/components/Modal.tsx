'use client';

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    children: React.ReactNode
}

const Modal:React.FC <ModalProps> = ({
    isOpen,
    onClose,
    children
}) => {
    return ( 
        <Transition.Root as={Fragment} show={isOpen}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300"
                enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-300"
                leave-from="opacity-100" leave-to="opacity-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" /> 
                </Transition.Child>
               <div className="fixed inset-0 z-10">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                        <Transition.Child as={Fragment} enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100
                        transalate-y-0 sm:scale-100" leave="ease-in duration-300" leave-from="opacity-100
                        transalate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white pb-4 px-4
                        text-left shadow-xl transtion-all w-full sm:w-full sm:max-w-lg sm:p-6">
                            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block z-10">
                                <button type="button" className="rounded-md bg-white text-gray-400 hover:text-gray-500
                                focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2" onClick={onClose}>
                                    <span className="sr-only">close</span>
                                    <IoClose className="w-6 h-6" />
                                </button>
                            </div>
                            {children}
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
               </div>
            </Dialog>
        </Transition.Root>
     );
}
 
export default Modal; 