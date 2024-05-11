"use client"
import { ButtonSetting, Loading } from '@/app/(component)'
import { getContent } from '@/utils/content'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [settings, setSettings] = useState(null)
    const [content, setContent] = useState([])

    useEffect(() => {
        window.document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        })

        getContent(1).then((res) => {
            setContent(res.data)
            console.log(res.data)
        })

        const storedSettings = JSON.parse(sessionStorage.getItem('settings'));
        if (storedSettings !== null) {
            setSettings(storedSettings);
        } else {
            const defaultSettings = {
                color: "",
                height: 200,
                alignContent: "left",
                alignImage: "left",
                size: 25
            }
            setSettings(defaultSettings);
            sessionStorage.setItem('settings', JSON.stringify(defaultSettings));
        }
    }, [])

    return (
        <>
            {settings !== null ? (
                <div className='w-full flex justify-center relative bg-gray-100'>
                    <div className='absolute top-12 right-2 z-50'>
                        <ButtonSetting />
                    </div>
                    <div style={{ height: settings.height, backgroundColor: settings.color }} className={`absolute bg-gray-400 w-full flex justify-center`}>
                    </div>
                    <div className='w-5/6 bg-white p-4 indent-4 rounded shadow-lg z-10 mt-4'>
                        <h1 className='font-semibold text-2xl' dangerouslySetInnerHTML={{ __html: content[0]?.title.replace('\n', '<p>') }}></h1>
                        <span className='font-semibold text-sm'>{content[0]?.date}</span>
                        {content?.length > 0 && content[0]?.img !== null && (
                            <div className='my-4'>
                                <Image priority src={content[0].img} alt={content[0]?.title.replace('\n', '')} width={500} height={500} style={{ width: `${settings.size}%`, height: "auto" }} />
                            </div>
                        )}
                        <div style={{ textAlign: settings.align }} dangerouslySetInnerHTML={{ __html: content[0]?.content.replace('\n', '<br/><br/><p>') }}></div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}
export default Page