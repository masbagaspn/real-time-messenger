'use client'

import { User } from "@prisma/client"
import Image from "next/image"
import useActiveList from "../hooks/useActiveListStore"

interface AvatarProps {
    user: User
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList()
  const isActive = members.indexOf(user?.email!) !== -1

  return (
    <div className="relative">
        <div className="relative rounded-full overflow-hidden w-6 h-6 md:h-8 md:w-8">
            <Image
                alt="Avatar"
                src={user?.image! ?? '/images/empty-avatar.jpg'}
                fill
                sizes="(max-width:768px) 24px, (min-width:768px) 24px"
                blurDataURL={user?.image! ?? '/images/empty-avatar.jpg'}
                placeholder="blur"
            />
        </div>
        {isActive &&
          <span className="absolute block rounded-full bg-green-600 ring-2 ring-white top-0 right-0 h-1 w-1 md:h-2 md:w-2"></span>
        }
    </div>
  )
}

export default Avatar