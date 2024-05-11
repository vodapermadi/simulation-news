"use client"
import { deleteOne, getData, postMany } from '@/utils/action'
import { getContent } from '@/utils/content'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [limit, setLimit] = useState(0)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [source, setSource] = useState([])
    const [site, setSite] = useState([])
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
            newSite.splice(index,1)
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
                                        <div key={i} className='relative w-full bg-white border border-gray-200 shadow-lg p-2'>
                                            <Link href={`/preview/${row._id}`} className=''>
                                                {row.title}
                                            </Link>
                                            <span className='absolute right-3 z-50 bg-red-600 p-0.5 hover:bg-red-500 text-white rounded cursor-pointer' onClick={() => deleteOne('content', { _id: { "$oid": row._id } }).then(() => setTimeout(() => window.location.reload(), 800))} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"></path>
                                                </svg>
                                            </span>
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