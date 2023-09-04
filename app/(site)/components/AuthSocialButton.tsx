import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
    icon: IconType,
    onClick: () => void
}

const AusthSocicalButton: React.FC<AuthSocialButtonProps> = ({
    icon: Icon,
    onClick
}) => {
    return ( 
        <button
        onClick={onClick}
        type="button"
        className="inline-flex w-full justify-center rounded-md bg-white
        px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300
        hover:ring-gray-400 focus:outline-offset-0">
            <Icon />
        </button>
     );
}
 
export default AusthSocicalButton;