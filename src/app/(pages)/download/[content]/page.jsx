"use client"
import { Loading } from '@/app/(component)'
import { getData } from '@/utils/action'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {
    const [settings, setSettings] = useState(null)
    const [content, setContent] = useState([])

    useEffect(() => {
        getData('content', { filter: { _id: { "$oid": params.content } } }).then((res) => {
            setContent(res)
        })

        const storedSettings = JSON.parse(sessionStorage.getItem('settings'))
        if (storedSettings !== null) {
            setSettings(storedSettings)
        } else {
            const defaultSettings = {
                color: '',
                height: 200,
                align: 'left',
            }
            setSettings(defaultSettings)
            sessionStorage.setItem('settings', JSON.stringify(defaultSettings))
        }
    }, [])

    const downloadPage = (img) => {
        const content = window.document.querySelector('body > div')
        content.querySelector('img').src = img
        content.querySelector('img').srcset = ""
        // console.log(content)
        let component = `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Document</title>
                                <script src="https://cdn.tailwindcss.com"></script>
                            </head>
                            <body>
                                ${content.outerHTML}
                            </body>
                            </html>`
        const cleanup = () => {
            URL.revokeObjectURL(url)
        }

        const blob = new Blob([component], { type: 'text/html' })
        const url = URL.createObjectURL(blob)

        const downloadLink = document.createElement('a')
        downloadLink.href = url
        downloadLink.download = 'page.html'

        downloadLink.click()
        return { confirmed: true, cleanup }
    }

    return (
        <>
            {content?.length > 0 ? (
                <>
                    <button className='fixed z-50 top-1/4 left-1/2 bg-green-700 text-white font-semibold rounded p-1.5' onClick={() => downloadPage(content[0]?.img)}>Download Page</button>
                    <div className='w-full flex justify-center relative bg-gray-100'>
                        <div style={{ height: settings.height, backgroundColor: settings.color }} className={`absolute bg-gray-400 w-full flex justify-center`}>
                        </div>
                        <div className='w-5/6 bg-white p-4 indent-4 rounded shadow-lg z-10 mt-4'>
                            <h1 className='font-semibold text-2xl' dangerouslySetInnerHTML={{ __html: content?.[0].title.replace('\n', '<p>') }}></h1>
                            <span className='font-semibold text-sm'>{content?.[0].date}</span>
                            {content[0]?.img !== null && (
                                <>
                                    <div className='my-4'>
                                        <Image priority src={content[0].img} alt={content[0]?.title.replace('\n', '')} width={500} height={500} style={{ width: `${settings.size}%`, height: "auto" }} />
                                    </div>
                                </>
                            )}
                            <div style={{ textAlign: settings.align }} dangerouslySetInnerHTML={{ __html: content?.[0].content.replace('\n', '<br/><br/><p>') }}></div>
                        </div>
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default page