import ProcessDialog from '../Dialog/ProcessDialog'

import {formatEther} from "viem"
import { useState, useEffect } from "react"
import Image from 'next/image'
import { formatString } from 'helper'


export interface ModelWeightCardProps {
    modelId: number,
    modelName: string,
    modelPrice: number
    modelKey:string,
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
            className=" card bg-gradient-to-r from-[#585a9d] to-[#919dc9] w-[300px] p-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-3 "
        >
            <div className="card-body">
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
                            alt='Arweave'
                            src='/tobi/Filecoin.png'
                            width={500}
                            height={500}
                            className='w-12 h-12'
                            />
                    }
                    <h2 className="card-title text-cat-base">{props.modelName}</h2>
                </div>
                <p className="text-center text-cat-base">{formatString(props.modelKey, 8)}</p>
                <p className="text-center text-cat-base">{formatEther(BigInt(props.modelPrice)) + " ETH"}</p>
                <div className="flex justify-center mt-7">
                    {props.isBuy === true  ? (
                        <div className='flex flex-row space-x-12'>
                            <button
                                className="btn btn-outline btn-ghost w-20 border-2"
                                onClick={(e) => { e.stopPropagation() }}
                            >
                                Buy
                            </button>
                        </div>
                    ) : (
                        <div className='flex flex-row space-x-12'>
                            <button
                                className="btn btn-primary w-20 border-2"
                                onClick={handleBuy}
                            >
                                Buy
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModelWeightCard