'use client'

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveListStore";

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
    const otherUser = useOtherUser(conversation)
    const [drawerOpen, setDrawerOpen] = useState(false)
    
    const { members } = useActiveList()
    const isActive = members.indexOf(otherUser?.email!) !== -1

    const statusText = useMemo(() => {
        if(conversation?.isGroup) {
            return `${conversation.users.length} members`
        }

        return isActive ? 'Online' : ''
    }, [conversation, isActive])

    return (
        <>
            <ProfileDrawer 
                data={conversation}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <div className="bg-white w-full flex border-b sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
                <div className="flex gap-3 items-center">
                    <Link
                        className="lg:hidden block text-neutral-400 hover:text-sky-600 cursor-pointer transition"
                        href={`/conversations`}
                    >
                        <HiChevronLeft size={20} />
                    </Link>
                    {conversation.isGroup ? (
                        <AvatarGroup users={conversation.users} />
                    ) : (
                        <Avatar user={otherUser} />
                    )}
                    <div className="flex flex-col">
                        <div className="capitalize">
                            {conversation.name || otherUser.name}
                        </div>
                        <div className="text-xs font-light text-neutral-500">
                            { statusText }
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal 
                    size={24}
                    onClick={() => setDrawerOpen(true)}
                    className="text-neutral-400 cursor-pointer hover:text-sky-600 transition hover:bg-sky-100 rounded-full"
                />
            </div>
        </>
    )
}

export default Header;