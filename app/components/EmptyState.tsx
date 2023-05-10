import Image from 'next/image'
import React from 'react'

const EmptyState = () => {
  return (
    <div className='w-full h-full grid place-content-center bg-neutral-100'>
        <div className='w-full flex flex-col gap-10 items-center justify-center text-center'>
            <Image 
                src='/images/empty-message.png'
                alt='empty-message'
                width={480}
                height={480}
                quality={100}
                className='w-auto h-2/3 object-cover object-center'
            />
            <div className='w-full h-fit flex flex-col items-center gap-4'>
                <span className='text-2xl font-semibold text-sky-400'>{`It's nice to chat with someone.`}</span>
                <span className='w-2/3 text-sm text-neutral-300'>Pick a person or add a new person from left menu and start a conversation.</span>
            </div>
        </div>
    </div>
  )
}

export default EmptyState