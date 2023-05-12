'use client'

import useConversation from "@/app/hooks/useConverstation"
import axios from "axios"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2"
import MessageInput from "./MessageInput"
import { CldUploadButton } from "next-cloudinary"

const Form = () => {
    const { conversationId } = useConversation()

    const { 
        register, 
        handleSubmit, 
        setValue, 
        formState: { 
            errors 
        }} = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('messages', '', { shouldValidate: true })
        axios.post('/api/messages', {
            ...data,
            conversationId
        })
    }

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        })
    }

  return (
    <div className="p-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
        <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset="thvnvsbj"
        >
            <HiPhoto size={20} className="text-neutral-500 hover:text-sky-600 cursor-pointer transition" />
        </CldUploadButton>
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="flex items-center gap-2 lg:gap-4 w-full"
        >
            <MessageInput
                id="message"
                register={register}
                errors={errors}
                required
                placeholder='Write a message'
            />
            <button
                type='submit'
                className="rounded-full p-2 text-neutral-500 hover:text-sky-600 transition cursor-pointer"
            >
                <HiPaperAirplane />
            </button>
        </form>
    </div>
  )
}

export default Form