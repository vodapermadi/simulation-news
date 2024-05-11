"use client"
import { Loading } from '@/app/(component)'
import { checkUser } from '@/utils/action'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const layout = ({ children }) => {
    const [idUser, setIdUser] = useState(null)
    const [check, setCheck] = useState(null)

    const router = useRouter()
    useEffect(() => {
        typeof window !== "undefined" && setIdUser(window.location.pathname.split('/')[1])
        typeof window !== "undefined" && checkUser(window.location.pathname.split('/')[1]).then((res) => {
            if (res !== true) {
                router.push('/')
            }else{
                setCheck(res)
            }
        })

        window.document.onkeydown = (e) => {
            if (e.key == 123) {
                e.preventDefault();
            }
            if (e.ctrlKey && e.shiftKey && e.key == 'I') {
                e.preventDefault();
            }
            if (e.ctrlKey && e.shiftKey && e.key == 'C') {
                e.preventDefault();
            }
            if (e.ctrlKey && e.shiftKey && e.key == 'J') {
                e.preventDefault();
            }
            if (e.ctrlKey && e.key == 'U') {
                e.preventDefault();
            }
        }
    }, [])

    const navbar = [
        {
            title: "Layout",
            path: `/${idUser}/edit-layout`
        },
        {
            title: "Content",
            path: `/${idUser}/content`
        },
    ]

    if(check !== null){
        return (
            <>
                {check !== false && (
                    <div className="w-full min-h-screen">
                        {/* navbar */}
                        <nav className="w-full py-3 border-b border-gray-300 flex justify-center items-center relative">
                            <div className="absolute top-3 left-5">
                                <button className="p-2 hover:bg-gray-100 duration-150 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h18M3 18h18"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="w-5/6 flex justify-between items-center">
                                <h1 className="font-semibold text-2xl">
                                    AGCB
                                </h1>
                            </div>
                        </nav>
                        {/* body */}
                        <aside className="w-[200px] min-h-screen border-r border-gray-300 absolute">
                            <div className="w-full h-full flex flex-col items-center gap-3 p-2 overflow-y-auto">
                                {navbar.map((row, key) => {
                                    return (
                                        <Link key={key} href={row.path} className="py-2 w-full text-center bg-emerald-700 font-semibold text-white rounded">{row.title}</Link>
                                    )
                                })}
                            </div>
                        </aside>
                        <div className="ml-[200px] p-2 bg-gray-100 min-h-screen">
                            {children}
                        </div>
                    </div>
                )}
            </>
        )
    }else{
        return(
            <>
                <Loading/>
            </>
        )
    }
}

export default layout