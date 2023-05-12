import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
    const params = useParams()
    const conversationId: string = params?.conversationId as string || ''

    const isOpen = useMemo(() => {
        return !!conversationId
    }
    , [conversationId])

    return useMemo(() => ({
        isOpen,
        conversationId
    }), [isOpen, conversationId])
}

export default useConversation;