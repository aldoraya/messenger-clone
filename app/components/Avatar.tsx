'use client';

import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
    user?: User
}

const Avatar: React.FC <AvatarProps> = ({
    user
}) => {
    const { members } = useActiveList();
    const isActive = members.indexOf(user?.email!) !== -1;
    
    return ( 
        <div className="relative">
            <div className="relative inline-block rounded-full
            overflow-hidden h-9 w-9 md:w-11 md:h-11">
                <Image
                 alt="avatar"
                 src={user?.image || "/images/placeholder.jpg"}
                 fill/> 
            </div>
            {isActive && (
                 <nav className="absolute block rounded-full w-2 h-2 md:w-3 md:h-3
                 bg-green-500 ring-2 ring-white top-0 right-0" />
            )}
           
        </div>
     );
}
 
export default Avatar;