'use client'

import React, { useState, useEffect } from 'react'
import { sleep, formatAddress } from 'helper'
import { useAccount } from 'wagmi'
import { ProposalCard } from '../Card/ProposalCard'
import { vote } from "../../service/kamui/contract";


interface VoteContent {
    proposalId: number,
    setIsLoading: any,
    onClose: any
}

const VoteProposal = ({ proposalId, setIsLoading, onClose }: VoteContent) => {
    const [proof, setProof] = useState('')
    const [isProcess, setProcess] = useState(false)

    async function handleAccept(e: any) {
        setIsLoading(true)
        await sleep(4000)
        vote(proof, proposalId, true);
        e.stopPropagation();
        setIsLoading(false)
        setProcess(true)
    }

    async function handleDeny(e: any) {
        setIsLoading(true)
        await sleep(2000)
        vote(proof, proposalId, false);
        e.stopPropagation();
        setIsLoading(false)
        setProcess(true)
    }

    return (
        <div className='flex flex-col items-center'>
            {
                isProcess
                    ? <div className='flex flex-col w-[200px] items-center'>
                        <div className='mb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="w-24 h-24">
                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="btn" onClick={onClose} >OK</div>
                    </div>
                    : <>
                        <div className='form-control pb-4'>
                            <textarea className='textarea textarea-bordered textarea-lg max-w-lg w-[350px] h-[200px]' placeholder='Paste proof' onChange={(e) => { setProof(e.target.value) }}></textarea>
                        </div>
                        <div className='flex flex-row space-x-20'>
                            <button
                                className="btn btn-outline btn-success w-20 border-2"
                                onClick={handleAccept}
                            >
                                Accept
                            </button>
                            <button
                                className="btn btn-outline btn-error w-20 border-2"
                                onClick={handleDeny}
                            >
                                Deny
                            </button>
                        </div>
                    </>
            }
        </div>
    )
}

export default VoteProposal
