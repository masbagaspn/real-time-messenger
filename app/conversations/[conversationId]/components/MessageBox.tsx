'use client'

import Avatar from "@/app/components/Avatar"
import { fullMessageType } from "@/app/types"
import clsx from "clsx"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import Image from "next/image"

interface MessageBoxProps {
    data: fullMessageType,
    isLast: boolean
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
    const session = useSession()

    const isOwn = session?.data?.user?.email === data?.sender?.email
    const seenList = (data.seen || []).filter(user => user.email !== data?.sender?.email).map(user => user.name).join(', ')

    const container = clsx(
        'flex gap-3 p-4',
        {'justify-end': isOwn}
    )

    const avatar = clsx({ 'order-2': isOwn })

    const body = clsx(
        'flex flex-col gap-2',
        {'items-end': isOwn}
    )

    const message = clsx(
        'text-sm w-fit overflow-hidden',
        { 'bg-sky-500 text-white': isOwn },
        { 'bg-neutral-100': !isOwn },
        { 'rounded-md p-0': data.image },
        { 'rounded-full py-2 px-3': !data.image }
    )
    
    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-neutral-500 capitalize">
                        {data.sender.name}
                    </div>
                    <div className="text-xs text-neutral-400">
                        {format(new Date(data.createdAt), 'p')}
                    </div>
                </div>
                <div className={message}>
                    {data.image ? (
                        <Image 
                            alt="Image"
                            height={200}
                            width={200}
                            src={data.image}
                            className="object-cevnter cursor-pointer hover:scale-110 transition translate"
                        />
                    ) : (
                        <div>{data.body}</div>
                    )}
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div className="text-xs font-light text-neutral-500">
                        {`Seen by ${seenList}`}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MessageBox