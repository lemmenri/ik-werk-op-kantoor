import React from 'react'
import Image from 'next/image';
import AuthButton from './AuthButton';

export default function Header() {
    return (
        <header
            id="header"
            className="flex flex-col sm:flex-row px-6 pt-4 sm:pt-1 text-white bg-primary w-full items-center"
        >
            <div className='flex flex-col sm:flex-row w-full items-center'>
                <Image
                    src="/icon.png"
                    width={50}
                    height={50}
                    alt="Le Tsai icon"
                />
                <h1 id="title" className="text-xl my-2 mx-4">
                    Ik werk op kantoor deze week
                </h1>
            </div>
            <div id='navigation' className='pb-4 sm:pb-0'>
                <AuthButton />
            </div>
        </header>
    )
}
