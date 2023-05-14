'use client'

import Avatar from "@/app/components/Avatar"
import LoadingModal from "@/app/components/modals/LoadingModal"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

interface UserBoxProps {
    data: User
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = useCallback(() => {
        setIsLoading(true)

        axios.post('/api/conversations', {
            userId: data.id
        })
        .then(data => {
            router.push(`conversations/${data.data.id}`)
        })
        .finally(() => setIsLoading(false))
    }, [data, router])

  return (
    <>
        {isLoading && (
            <LoadingModal />
        )}
        <div
            onClick={handleClick}
            className="relative w-full flex items-center space-x-3 p-3 bg-white rounded-md transition cursor-pointer hover:bg-neutral-100"
        >
            <Avatar user={data} />
            <p className="flex-1 focus:outline-none text-sm tracking-tight font-medium text-neutral-900 capitalize">{data.name}</p>
        </div>
    </>
  )
}

export default UserBox