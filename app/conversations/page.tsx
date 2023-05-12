'use client'

import clsx from "clsx"

import useConversation from "../hooks/useConverstation"
import EmptyState from "../components/EmptyState"

const Home = () => {
    const { isOpen } = useConversation()

    return (
        <div className={clsx(
            'lg:pl-80 h-full lg:block',
            {'hidden': !isOpen},
            {'block': isOpen}
        )}>
            <EmptyState />
        </div>
    )
}

export default Home;