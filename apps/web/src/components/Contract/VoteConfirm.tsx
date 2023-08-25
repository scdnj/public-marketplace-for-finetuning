'use client'

import React, { useState } from 'react'
import { vote } from "../../service/kamui/contract";
import { voteProposal } from 'tezos-interact'
import KamuiLoading from '../../components/Loading/KamuiLoading'


interface VoteContent {
    proposalId: number,
    action: boolean,
    proof: any,
    onClose: any
}

const VoteProposal = ({ proposalId, action, proof, onClose }: VoteContent) => {
    const [isProcess, setProcess] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const handleVote = async () => {
        try {
            setIsLoading(true)
            await vote(proof, proposalId, action)
            await voteProposal(proposalId+1, action ? 1 : 2)
            setIsLoading(false)
            setProcess(true)
        } catch (error) {
            setIsLoading(false)
        }

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
                    : <div className='flex flex-col space-y-5 w-[200px] items-center'>
                        {
                            isLoading
                            ? <KamuiLoading />
                            : <>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-24 h-24">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                                <div className='font-mono font-bold text-3xl'>{action ? "Accept" : "Deny"}?</div>
                                </>
                        }
                        <button
                            className="btn btn-outline btn-warning w-20 border-2"
                            onClick={handleVote}
                            disabled={isLoading}
                        >
                            Confirm
                        </button>
                       
                    </div>
            }
        </div>
    )
}

export default VoteProposal
