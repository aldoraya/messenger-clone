'use client';

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
    isOpen?: boolean;
    onClose: () => void;
    src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    onClose,
    src
}) => {
    if (!src) {
        return null;
    }

    return ( 
        <Modal onClose={onClose} isOpen={isOpen}>
           <div className="w-80 h-80 lg:w-[33rem] lg:h-[30rem]">
                <Image
                src={src}
                alt="Image"
                fill
                className="bg-cover bg-center"
                />
           </div>
        </Modal>
     );
}
 
export default ImageModal;