'use client'

import Avatar from "@/app/components/Avatar"
import useOtherUser from "@/app/hooks/useOtherUser"
import { fullConversationType } from "@/app/types"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import { format } from "date-fns"
import AvatarGroup from "@/app/components/AvatarGroup"

interface ConversationBoxProps {
    data: fullConversationType,
    selected: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected
}) => {
    const otherUser = useOtherUser(data)
    const session = useSession()
    const router = useRouter()
    
    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`)
    }, [data.id, router])

    const lastMessage = useMemo(() => {
        const messages = data.messages || []

        return messages[messages.length-1]
    } ,[data.messages])

    const userEmail = useMemo(() => {
        return session?.data?.user?.email
    } ,[session?.data?.user?.email])

    const hasSeen = useMemo(() => {
        if(!lastMessage) return false;

        const seenArray = lastMessage.seen || []

        if(!userEmail) return false

        return seenArray.filter((user) => user.email === userEmail).length !== 0
    } ,[lastMessage, userEmail])

    const lastMessageText = useMemo(() => {
        if(lastMessage?.image){
            return 'Sent an image'
        }

        if(lastMessage?.body){
            return lastMessage.body
        }

        return 'Start a conversation!'
    }, [lastMessage])

    return (
        <div
            onClick={handleClick} 
            className={clsx(
                'w-full h-fit relative flex items-center space-x-3 rounded-lg cursor-pointer p-3 transition bg-white hover:bg-neutral-100',
                {'bg-neutral-100': selected}
            )}
        >
            { data.isGroup ? (
                <AvatarGroup users={data.users} />
            ) : (
                <Avatar user={otherUser} />
            )        
            }
            <div className="min-w-0 flex-1">
                <div className="flex-col gap-1 focus:outline-none">
                    <div className="flex justify-between items-center">
                        <p className="capitalize text-sm font-medium text-neutral-900">{data.name || otherUser.name}</p>
                        {lastMessage?.createdAt && (
                            <p className="text-xs text-neutral-400 font-light">{format(new Date(lastMessage.createdAt), 'p')}</p>
                        )}
                    </div>
                    <p className={clsx(
                            "truncate text-xs",
                            {'text-neutral-500':hasSeen},
                            {'text-neutral-900 font-medium':!hasSeen}
                        )}
                    >
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox