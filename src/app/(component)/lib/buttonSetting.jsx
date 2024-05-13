"use client"
import { updateOne } from '@/utils/action'
import React, { useState } from 'react'

const ButtonSetting = ({ settings, setSettings,id }) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button className='bg-white p-1.5 rounded text-green-500 border border-white shadow-lg' onClick={() => setOpen(!open)}>
                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 1024 1024">
                    <path fill="currentColor" d="M512.5 390.6c-29.9 0-57.9 11.6-79.1 32.8c-21.1 21.2-32.8 49.2-32.8 79.1s11.7 57.9 32.8 79.1c21.2 21.1 49.2 32.8 79.1 32.8s57.9-11.7 79.1-32.8c21.1-21.2 32.8-49.2 32.8-79.1s-11.7-57.9-32.8-79.1a110.96 110.96 0 0 0-79.1-32.8m412.3 235.5l-65.4-55.9c3.1-19 4.7-38.4 4.7-57.7s-1.6-38.8-4.7-57.7l65.4-55.9a32.03 32.03 0 0 0 9.3-35.2l-.9-2.6a442.5 442.5 0 0 0-79.6-137.7l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.2 28.9c-30-24.6-63.4-44-99.6-57.5l-15.7-84.9a32.05 32.05 0 0 0-25.8-25.7l-2.7-.5c-52-9.4-106.8-9.4-158.8 0l-2.7.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.3a353.4 353.4 0 0 0-98.9 57.3l-81.8-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a445.9 445.9 0 0 0-79.6 137.7l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.2 56.5c-3.1 18.8-4.6 38-4.6 57c0 19.2 1.5 38.4 4.6 57l-66 56.5a32.03 32.03 0 0 0-9.3 35.2l.9 2.6c18.1 50.3 44.8 96.8 79.6 137.7l1.8 2.1a32.12 32.12 0 0 0 35.1 9.5l81.8-29.1c29.8 24.5 63 43.9 98.9 57.3l15.8 85.3a32.05 32.05 0 0 0 25.8 25.7l2.7.5a448.3 448.3 0 0 0 158.8 0l2.7-.5a32.05 32.05 0 0 0 25.8-25.7l15.7-84.9c36.2-13.6 69.6-32.9 99.6-57.5l81.2 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.5-87.4 79.6-137.7l.9-2.6c4.3-12.4.6-26.3-9.5-35m-412.3 52.2c-97.1 0-175.8-78.7-175.8-175.8s78.7-175.8 175.8-175.8s175.8 78.7 175.8 175.8s-78.7 175.8-175.8 175.8"></path>
                </svg>
            </button>

            {open && (
                <div className='w-[300px] flex justify-center flex-col bg-white mt-2 p-2 rounded'>
                    {/* background color */}
                    <div className='w-full'>
                        <span className='font-semibold text-lg'>Background</span>
                        <div className='ml-4 mb-4'>
                            <label className='text-sm font-semibold' htmlFor="color">Color</label>
                            <input type="color" id='color' className='w-full' value={settings.setup.background.color} onChange={(e) => setSettings({
                                ...settings,
                                setup: {
                                    ...settings.setup,
                                    background: {
                                        ...settings.setup.background,
                                        color: e.target.value
                                    }
                                }
                            })} />
                        </div>

                        {/* title */}
                        <span className='font-semibold text-lg'>Title</span>
                        <div className='ml-4'>
                            <label className='text-sm font-semibold' htmlFor="align">Align text</label>
                            <select id='align' className='w-full my-2' value={settings.setup.title.align} onChange={(e) => setSettings({
                                ...settings,
                                setup: {
                                    ...settings.setup,
                                    title: {
                                        ...settings.setup.title,
                                        align: e.target.value
                                    }
                                }
                            })}>
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                            </select>

                            <label className='text-sm font-semibold mt-1' htmlFor="size">Font Size</label>
                            <input type="range" id='size' min={10} className='w-full my-2' value={parseInt(settings.setup.title.size.replace('px', ''))} onChange={(e) => setSettings({
                                ...settings,
                                setup: {
                                    ...settings.setup,
                                    title: {
                                        ...settings.setup.title,
                                        size: String(e.target.value) + "px"
                                    }
                                }
                            })} />

                            <label className='text-sm font-semibold mt-1' htmlFor="style">Font Style</label>
                            <select id='style' className='w-full my-2' value={settings.setup.title.type} onChange={(e) => setSettings({
                                ...settings,
                                setup: {
                                    ...settings.setup,
                                    title: {
                                        ...settings.setup.title,
                                        type: e.target.value
                                    }
                                }
                            })}>
                                <option value="normal">Normal</option>
                                <option value="italic">Italic</option>
                            </select>

                            <label className='text-sm font-semibold mt-1' htmlFor="size">Font weight</label>
                            <input type="range" id='size' min={100} step={100} max={1000} className='w-full my-2' value={parseInt(settings.setup.title.width)} onChange={(e) => setSettings({
                                ...settings,
                                setup: {
                                    ...settings.setup,
                                    title: {
                                        ...settings.setup.title,
                                        width: parseInt(e.target.value)
                                    }
                                }
                            })} />

                            {/* image */}
                            <span className='font-semibold text-lg'>Image</span>
                            <div className='ml-4 mb-4'>
                                <label className='text-sm font-semibold' htmlFor="imagePosition">Image Position</label>
                                <select id='imagePosition' className='w-full my-2' value={settings.setup.image.align} onChange={(e) => setSettings({
                                    ...settings,
                                    setup: {
                                        ...settings.setup,
                                        image: {
                                            ...settings.setup.image,
                                            align: e.target.value
                                        }
                                    }
                                })}>
                                    <option value="left">Left</option>
                                    <option value="center">Center</option>
                                    <option value="right">Right</option>
                                </select>
                            </div>

                            <div className='ml-4 mb-4'>
                                <label className='text-sm font-semibold mt-1' htmlFor="imagesize">Image Size</label>
                                <input type="range" id='imagesize' min={10} className='w-full my-2' value={parseInt(settings.setup.image.size.replace('%', ''))} onChange={(e) => setSettings({
                                    ...settings,
                                    setup: {
                                        ...settings.setup,
                                        image: {
                                            ...settings.setup.image,
                                            size: String(e.target.value) + "%"
                                        }
                                    }
                                })} />
                            </div>
                        </div>
                    </div>
                    <button onClick={() => {
                        let newSetting = {
                            ...settings
                        }

                        delete newSetting._id
                        updateOne('setting',{id_user:id},newSetting).then(() => {
                            setTimeout(() => {
                                window.location.reload()
                            },200)
                        })
                    }} className='py-2 mt-2 bg-green-700 font-semibold text-white'>Save</button>
                </div>
            )}
        </>
    )
}

export default ButtonSetting