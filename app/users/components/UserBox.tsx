'use client';

import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface userBoxProps {
    data: User
}

const UserBox: React.FC <userBoxProps> = ({
    data
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);

        axios.post("/api/conversations", {
            userId: data.id
        })
        .then((data) => {
            router.push(`/conversations/${data.data.id}`);
        })
        .finally(() => setIsLoading(false));
    }, [data, router])
    return ( 
        <div 
        onClick={handleClick}
        className="w-full relative flex items-center space-x-3 bg-white
        p-3 hover:bg-netral-100 transition cursor-pointer"
        >
            <Avatar user={data} />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-gray-900 font-medium text-sm">
                            {data.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default UserBox;