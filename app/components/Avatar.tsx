'use client';

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
    user?: User
}

const Avatar: React.FC <AvatarProps> = ({
    user
}) => {
    return ( 
        <div className="relative">
            <div className="relative inline-block rounded-full
            overflow-hidden h-9 w-9 md:w-11 md:h-11">
                <Image
                 alt="avatar"
                 src={user?.image || "/images/placeholder.jpg"}
                 fill/> 
            </div>
            <nav className="absolute block rounded-full w-2 h-2 md:w-3 md:h-3
            bg-green-500 ring-2 ring-white top-0 right-0" />
        </div>
     );
}
 
export default Avatar;