"use client"

import clsx from "clsx"
import Link from "next/link"

interface MobileItemProps {
    href: string,
    icon: any,
    onClick?: () => void,
    active?: boolean
}

const MobileItem: React.FC<MobileItemProps> = ({
    href,
    icon: Icon,
    active,
    onClick
}) => {
    const handleClick = () => {
        if(onClick) {
            return onClick()
        }
    }

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={clsx(
                'group w-full flex justify-center gap-x-3 p-4 text-sm leading-6 font-semibold',
                'hover:text-sky-500',
                {'text-sky-500':active},
                {'text-neutral-300':!active}
            )}
        >
            <Icon />
        </Link>
    )
}

export default MobileItem