'use client'

import React, { useState, useEffect } from 'react'
import {sleep, formatAddress} from 'helper'
import { useAccount } from 'wagmi'

export interface VerifyProofProps {
    setVerified: any
    onClose: any
}

const VerifyProof = ({setVerified, onClose}: VerifyProofProps) => {
    const [proof, setProof] = useState('')
    const [isProcess, setIsProcess] = useState(false)
    const [isPassed, setIsPassed] = useState(false)
    const { address, isConnected } = useAccount()

    const verifyProof = async () => {
        setIsProcess(true)
        console.log(proof)
        await sleep(4000)
        if(isPassed){
            setVerified(true)
        }
    }

    return (
        <div className='flex flex-col items-center'>
            {
                isProcess
                ? <>
                    <div> { proof === 'pass' ? <span>Success</span> : <span>Failed</span> } </div>
                    <div className="btn" onClick={onClose} >OK</div>
                </>
                :<>
                    <div className='form-control pb-4 w-500 h-500'>
                        <label className='label'>
                            <span className='label-text'>Paste Proof</span>
                        </label>
                        <textarea className='textarea textarea-bordered textarea-lg w-full max-w-lg' onChange={(e) => { setProof(e.target.value) }}></textarea>
                    </div>
                    <div className='btn' onClick={verifyProof} >Verify</div>
                </>
            }
        </div>
    )
}

export default VerifyProof
