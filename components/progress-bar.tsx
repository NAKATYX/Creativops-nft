"use client"

import useContract from '@/hooks/useContract'
import React from 'react'

const ProgressBar = () => {

    const { data: supply, isPending, isError } = useContract('totalSupply')

    return (
        <div className="mb-4" >
            <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Minted</span>
                <span>
                    {isPending ? "Loading..." : `${supply?.toString().toLocaleString()} / 10000}`}
                </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${parseInt(supply?.toString() as string) / 10000 * 100}%` }}
                ></div>
            </div>
        </div >
    )
}

export default ProgressBar