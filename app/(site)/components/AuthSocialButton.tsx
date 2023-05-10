import { IconType } from 'react-icons'

interface AuthSocialButtonProps {
    icon: IconType,
    name: string,
    onClick: () => void
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
    icon: Icon,
    name,
    onClick
}) => {
  return (
    <button
        type='button'
        onClick={onClick}
        className={`
            inline-flex w-full justify-center items-center rounded-md bg-white
            px-4 py-4 gap-3 text-neutral-800 text-xs font-semibold shadow-sm
            ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50
            focus:outline-offset-0
        `}
    >
        <Icon />
        Continue with {name}
    </button>
  )
}

export default AuthSocialButton