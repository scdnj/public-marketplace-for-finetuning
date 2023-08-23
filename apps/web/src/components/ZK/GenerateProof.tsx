'use client'

import React, { useState } from 'react';
import { sleep, formatAddress } from 'helper'
import { useAccount } from 'wagmi'

export interface GenerateProofProps {
    imgSrc: any
    handleCopyClick: any
    setIsLoading: any
    onClose: any
}

const handleProcess2GrayScale = async (imgSrc : any): Promise<any> => {
    const base64WithoutHeader = imgSrc.replace(/^data:image\/\w+;base64,/, '')
    const binaryString = atob(base64WithoutHeader);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    
    return bytes.buffer
}


const GenerateProof = ({ imgSrc, handleCopyClick, setIsLoading, onClose }: GenerateProofProps) => {
    const [isCopied, setCopied] = useState(false);
    const [proof, setProof] = useState(null)
    const { address, isConnected } = useAccount()
    const [grayScaleBase64, setGrayScaleBase64] = useState('');

    const genProof = async () => {
        setIsLoading(true)
        const result = await handleProcess2GrayScale(imgSrc)
        console.log(result)
        await sleep(2000)
        setIsLoading(false)
        setProof(address)
    }

    const handleCopyProof = () => {
        const textToCopy = proof
        navigator.clipboard.writeText(textToCopy as string).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1000)
        });
    };

    return (
        <div className="flex flex-col items-center ">
            <div className="pb-4">
                <span>Preview</span>
                {imgSrc ? <img src={imgSrc} /> : null}
            </div>
            <div>
                {
                    proof
                        ? <div className='flex flex-row space-x-3 items-center'>
                            <div className='flex flex-row space-x-2 p-4 border-2 border-solid shadow-[0_3px_10px_rgb(0,0,0,0.2)] card'>
                                <span className='text-white font-mono'>{formatAddress(proof as string)}</span>
                                <label className='swap items-center'>
                                    <input type='checkbox' checked={isCopied} />
                                    <svg className="swap-on w-6 h-6" onClick={() => {
                                        handleCopyProof();
                                        handleCopyClick();
                                    }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    <svg className="swap-off w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                                    </svg>
                                </label>
                            </div>
                            <div className="btn" onClick={onClose} >OK</div>
                        </div>
                        : <div className="btn" onClick={genProof} >Generate</div>
                }
            </div>
        </div>
    );
}

export default GenerateProof;
