import ProcessDialog from '../Dialog/ProcessDialog'

import { formatEther } from "viem"
import { useState, useEffect } from "react"
import Image from 'next/image'
import { formatString } from 'helper'
import Link from 'next/link'


export interface ModelWeightCardProps {
    modelId: number,
    modelName: string,
    modelPrice: number
    modelKey: string,
    storageType: any,
    isBuy: boolean,
    setIsConfirmDialogOpen: any,
    setModelWeightId: any,
    setModelWeightName: any,
}

const ModelWeightCard = (props: ModelWeightCardProps) => {

    async function handleBuy() {
        props.setModelWeightId(props.modelId)
        props.setModelWeightName(props.modelName)
        props.setIsConfirmDialogOpen(true)
    }

    return (
        <div
            className=" card bg-gradient-to-r from-[#585a9d] to-[#919dc9] w-[300px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-3 "
        >
            <div className="card-body gap-4">
                <div className="flex flex-row items-center mb-2 space-x-3">
                    {props.storageType === "AR"
                        ? <Image
                            alt='Arweave'
                            src='/tobi/AR.png'
                            width={500}
                            height={500}
                            className='w-14 h-14'
                        />
                        : <Image
                            alt='Filecoin'
                            src='/tobi/Filecoin.png'
                            width={500}
                            height={500}
                            className='w-14 h-14'
                        />
                    }
                    <h2 className="card-title text-cat-base">{props.modelName}</h2>
                </div>
                <div className='flex flex-row m-2 p-4 border-2 border-solid bg-[#d3d8ea] shadow-[0_3px_10px_rgb(0,0,0,0.2)] card justify-center border-[#919dc9]'>
                    <span className="font-mono text-cat-base">{formatString(props.modelKey, 8)}</span>
                </div>
                {props.isBuy === true ? (
                    <div className='flex items-center justify-center'>
                        <Link href={'/vote'}>
                            <button
                                className="btn btn-accent border-2"
                            >
                                Try it
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-cat-base">{formatEther(BigInt(props.modelPrice)) + " ETH"}</span>
                        <button
                            className="btn btn-primary w-20 border-2"
                            onClick={handleBuy}
                        >
                            Buy
                        </button>
                    </div>
                )}
            </div>
        </div >
    );
}

export default ModelWeightCard