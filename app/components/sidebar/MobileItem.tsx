"use client";

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link 
    onClick={handleClick} 
    href={href} 
    className={clsx(`group flex justify-center gap-x-3 text-sm leading-6 w-full p-4 text-gray-500 font-semibold hover:text-black
    hover:bg-gray-100`, active && 'bg-gray-100 text-[#000]')}>
      <Icon className="w-6 h-6 shrink-0" />
    </Link>
  );
};

export default MobileItem;
