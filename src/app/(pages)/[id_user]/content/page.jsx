"use client"
import { deleteOne, getData, postMany } from '@/utils/action'
import { getContent } from '@/utils/content'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [limit, setLimit] = useState(0)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [source, setSource] = useState([])
    const [site, setSite] = useState([])

    const router = useRouter()

    useEffect(() => {
        getData('content').then((res) => {
            setData(res)
        })

        getData('data').then((res) => {
            setSource(res)
        })

    }, [])

    const generateContent = (limit, source) => {
        setLoading(true)
        getContent(limit, source.length === 0 ? site : source).then((res) => {
            postMany('content', res.data.map((row) => row)).then(() => {
                setLoading(false)
                setTimeout(() => {
                    window.location.reload()
                }, 800)
            })

        })
    }

    const handleSite = (source) => {
        const newSite = [...site]
        if (newSite.includes(source)) {
            const index = newSite.indexOf(source)
            newSite.splice(index, 1)
            setSite(newSite)
        } else {
            newSite.push(source)
            setSite(newSite)
        }
    }

    return (
        <>
            <div className='w-full flex justify-center'>
                <div className="w-5/6">
                    {data?.length !== 10 && (
                        <>
                            <div className='flex justify-center items-start flex-col w-full gap-2'>
                                <label htmlFor="limit">How much for generate content?</label>
                                <input type="number" className='border border-gray-400 font-semibold text-sm p-1 focus:outline-none' value={limit} onChange={(e) => {
                                    const newLimit = parseInt(e.target.value)
                                    const remainingItems = 10 - data.length
                                    if (newLimit <= remainingItems) {
                                        setLimit(newLimit)
                                    } else {
                                        window.alert(`Your limit exceeds the available content. Maximum limit is ${remainingItems}.`)
                                    }
                                }} />
                            </div>
                            <div className='flex justify-center items-start flex-col w-full gap-1 mb-2'>
                                <label htmlFor="source">Source Content</label>
                                <div className='flex flex-col gap-2'>
                                    {source?.map((row, i) => {
                                        return (
                                            <>
                                                <div key={i} className='w-full flex items-center gap-2'>
                                                    <input id={i} type="checkbox" onChange={(e) => handleSite(e.target.value)} value={row.source} />
                                                    <label htmlFor={i}>{row.source}</label>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            {loading ? (
                                <div className='w-full border border-gray-300 p-4 font-semibold text-lg capitalize'>
                                    loading...
                                </div>
                            ) : (
                                <button onClick={() => generateContent(limit, site)} className='p-1.5 rounded text-white font-semibold bg-green-700'>{loading ? "loading" : "Generate"}</button>
                            )}
                        </>
                    )}

                    <div className='flex flex-col justify-center items-start gap-2 mt-4 text-center'>
                        {data?.length === 0 ? (
                            <div className='w-full border border-gray-300 p-4 font-semibold text-lg capitalize'>
                                not found
                            </div>
                        ) : (
                            <div className='w-full border border-gray-300 p-4 text-left gap-1 flex flex-col '>
                                {data?.map((row, i) => {
                                    return (
                                        <div key={i} className='flex items-center justify-between w-full bg-white border border-gray-200 shadow-lg p-2'>
                                            <span className=''>
                                                {row.title}
                                            </span>
                                            <div className='flex justify-center items-center gap-2'>
                                                <span className='bg-red-600 p-0.5 hover:bg-red-500 text-white rounded cursor-pointer' onClick={() => deleteOne('content', { _id: { "$oid": row._id } }).then(() => setTimeout(() => window.location.reload(), 800))} >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"></path>
                                                    </svg>
                                                </span>
                                                <span className='bg-blue-600 p-0.5 hover:bg-blue-500 text-white rounded cursor-pointer' onClick={() => router.push(`/download/${row._id}`)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M16.59 9H15V4c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v5H7.41c-.89 0-1.34 1.08-.71 1.71l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.63-.63.19-1.71-.7-1.71M5 19c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1"></path>
                                                    </svg>
                                                </span>
                                                <span className='bg-green-600 p-0.5 hover:bg-green-500 text-white rounded cursor-pointer' onClick={() => router.push(`/preview/${row._id}`)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 48 48">
                                                        <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={4}>
                                                            <path d="M24 36c11.046 0 20-12 20-12s-8.954-12-20-12S4 24 4 24s8.954 12 20 12Z"></path>
                                                            <path d="M24 29a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z"></path>
                                                        </g>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default page