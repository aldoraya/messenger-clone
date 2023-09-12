'use client';

import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import useConversation from "@/app/hooks/useConversation";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

interface ConfirmModalProps {
    isOpen?: boolean;
    onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose
}) => {
    const router = useRouter();
    const { conversationId } = useConversation();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = useCallback(() => {
        setIsLoading(true);

        axios.delete(`/api/conversations/${conversationId}`)
        .then(() => {
            onClose();
            router.push('/conversation');
            router.refresh();
        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false))
    }, [conversationId, router, onClose])

    return ( 
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex">
                <div className="w-10 h-10 p-4 rounded-full bg-red-100">
                    <FiAlertTriangle className="w-6 h-6 text-rose-500 relative bottom-[11px] right-2" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Delete Conversation
                    </Dialog.Title>
                    <p className="mt-2 text-sm text-gray-500">Are you sure want to delete this conversation?
                    This action cannot be undone.</p>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse space-x-2">
                <Button disabled={isLoading} danger onClick={onDelete}>Delete</Button>
                <Button disabled={isLoading} secondary onClick={onClose}>Cancel</Button>
            </div>
        </Modal>
     );
}
 
export default ConfirmModal;