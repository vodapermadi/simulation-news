"use client"
import { Loading } from '@/app/(component)'
import { getData } from '@/utils/action'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {
    const [settings, setSettings] = useState([])
    const [content, setContent] = useState([])
    const [loading, setLoading] = useState(true)
    const parameter = useSearchParams()

    useEffect(() => {
        getData('content', { filter: { _id: { "$oid": params.content } } }).then((res) => {
            setContent(res)
        })

        getData('setting', { filter: { id_user: parameter.get('uid') } }).then((res) => {
            setSettings(res[0])
            setLoading(false)
        })
    }, [])

    const downloadPage = (img = null) => {
        const content = window.document.querySelector('body > div')

        if (img !== null) {
            content.querySelector('img').src = img
            content.querySelector('img').srcset = ""
        }
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
            {!loading ? (
                <>
                    <button className='w-full py-2 absolute top-0 z-50 bg-green-500' onClick={() => downloadPage(content[0].img !== null ? content[0].img : null)}>Click for Download now</button>
                    <div style={{
                        backgroundColor: settings?.setup.background.color
                    }} className='w-full flex justify-center relative pb-4 min-h-screen'>
                        {settings.setup.heroSection.enable && (
                            <div style={{ height: settings.setup.heroSection.size, backgroundColor: settings.setup.heroSection.color }} className={`absolute bg-gray-400 w-full flex justify-center`}></div>
                        )}
                        <div className='w-5/6 bg-white p-4 rounded shadow-lg z-10 mt-4'>
                            <h1 className='font-semibold w-full' style={{
                                textAlign: settings.setup.title.align,
                                fontSize: settings.setup.title.size,
                                fontStyle: settings.setup.title.type,
                                fontWeight: settings.setup.title.width
                            }} dangerouslySetInnerHTML={{ __html: content[0]?.title.replace('\n', '<p>') }}></h1>
                            <span className='font-semibold text-sm'>{content[0]?.date}</span>
                            {content?.length > 0 && content[0]?.img !== null && (
                                <div className='my-2 w-full flex items-center' style={{
                                    justifyContent: settings.setup.image.align
                                }}>
                                    <Image priority src={content[0].img} alt={content[0]?.title.replace('\n', '')} width={500} height={500} style={{ width: `${settings.setup.image.size}`, height: "auto", borderRadius: `${settings.setup.image.border}` }} />
                                </div>
                            )}
                            <div style={{ textAlign: settings.setup.content.align }} className='indent-4' dangerouslySetInnerHTML={{ __html: content[0]?.content.replace('\n', '<br/><br/><p>') }}></div>
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