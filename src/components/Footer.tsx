import React from 'react'

export default function Footer() {
    return (
        <footer
            id="footer"
            className="flex flex-col px-8 pt-4 text-white bg-primary w-full items-center"
        >
            <div id='footer-text' className='flex flex-col w-full items-center text-sm my-4 mx-8'>
                <p>For more information about LetsConnect and to embark on your journey with us, please visit our website:
                    <a
                        href='https://www.letsconnect.nl'
                        target="_blank"
                        rel="noopener noreferrer"
                        className='underline pl-1'
                    >
                        www.letsconnect.nl
                    </a>
                    . Explore our diverse range of resources and discover how we can assist you in achieving your goals.
                </p>
            </div>
        </footer>
    )
}
