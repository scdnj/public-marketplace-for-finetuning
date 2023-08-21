'use client'

import React, { useState, useEffect } from 'react'
import { sleep, formatAddress } from 'helper'
import { useAccount } from 'wagmi'

export interface VerifyProofProps {
    setVerified: any
    onClose: any
}

const VerifyProof = ({ setVerified, onClose }: VerifyProofProps) => {
    const [proof, setProof] = useState('')
    const [isProcess, setIsProcess] = useState(false)
    const [isPassed, setIsPassed] = useState(false)
    const { address, isConnected } = useAccount()

    const verifyProof = async () => {
        setIsProcess(true)
        const result = proof === 'pass' ? await setIsPassed(true) : null
        console.log(proof)
        await sleep(4000)
    }

    useEffect(() => {
        if (isPassed) {
            setVerified(true)
        }
    }, [isPassed])

    return (
        <div className='flex flex-col items-center'>
            {
                isProcess
                    ? <>
                        <div className='mb-4'>
                            {isPassed
                                ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="w-24 h-24">
                                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                </svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-24 h-24">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                                </svg>
                            }
                        </div>
                        <div className="btn" onClick={onClose} >OK</div>
                    </>
                    : <>
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
