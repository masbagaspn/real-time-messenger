'use client'

import useConversation from "@/app/hooks/useConverstation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
    const routes = useRoutes()
    const { isOpen } = useConversation()

    if(isOpen) {
        return null
    }

    return(
        <div className="fixed w-full flex items-center justify-between bottom-0 z-40 bg-white border-t-[1px] lg:hidden">
            {
                routes.map( item => (
                    <MobileItem
                        key={item.href}
                        href={item.href}
                        active={item.active}
                        icon={item.icon}
                        onClick={item.onClick}
                    />
                ))
            }
        </div>
    )
}

export default MobileFooter;