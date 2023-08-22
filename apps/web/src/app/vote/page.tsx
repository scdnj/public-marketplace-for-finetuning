'use client'

import WebcamCapture from '../../components/Webcam/WebcamCapture'
import ProcessDialog from '../../components/Dialog/ProcessDialog'
import GenerateProof from '../../components/ZK/GenerateProof'
import VerifyProof from '../../components/ZK/VerifyProof'
import ProcessLoading from '../../components/Loading/ProcessLoading'
import KamuiLoading from '../../components/Loading/KamuiLoading'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export default function Vote() {
    const [isLoading, setIsLoading] = useState(false);
    const [isKamuiLoading, setIsKamuiLoading] = useState(false);
    const { address, isConnected } = useAccount()
    const [mounted, setMounted] = useState(false)
    const [isCaptureDialogOpen, setIsCaptureDialogOpen] = useState(false)
    const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false)
    const [isGenProofDialogOpen, setIsGenProofDialogOpen] = useState(false)
    const [isVerified, setVerified] = useState(false)
    const [imgSrc, setImgSrc] = useState(null)
    const [copied, setCopied] = useState(false)

    async function openCaptureDialog() {
        setIsCaptureDialogOpen(!isCaptureDialogOpen)
    }

    async function openGenProofDialog() {
        setIsGenProofDialogOpen(!isGenProofDialogOpen)
    }

    async function openVerifyDialog() {
        setIsVerifyDialogOpen(!isVerifyDialogOpen)
    }

    const handleCopyClick = () => {
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }

    useEffect(() => {
        if (isConnected) {
            setMounted(true)
        } else {
            setMounted(false)
        }
    }, [address, isConnected])

    return (
        <div className='flex items-center justify-center'>
            <div className='mx-auto w-full px-8 pt-8 pb-8'>
                <div className='flex-col'>
                    <div className='flex flex-row space-x-3 items-center'>
                        <p className='font-mono text-black font-bold text-3xl dark:text-white my-4'>
                            Account Status
                        </p>
                        {isVerified
                            ? <div className='badge badge-accent'>Verified</div>
                            : <div className='badge badge-secondary'>Unverified</div>
                        }
                    </div>
                    <div className='flex flex-row py-2 space-x-11 justify-center'>
                        <div className='flex flex-col items-center space-y-5'>
                            <span className='font-mono'>1. Capture your face for KYC</span>
                            <div className='bg-gradient-to-r from-[#42275a] to-[#734b6d] card w-[350px] p-4 text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                                <div className='btn btn-ghost' onClick={openCaptureDialog}>Capture face</div>
                            </div>
                        </div>
                        <div className='flex flex-col items-center space-y-5'>
                            <span className='font-mono'>2. Check your face to generate proof</span>
                            <div className='bg-gradient-to-r from-[#42275a] to-[#734b6d] card w-[350px] p-4 text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                                {
                                    imgSrc
                                        ? <div className='btn btn-ghost' onClick={openGenProofDialog}>Generate Proof</div>
                                        : <div className='btn btn-ghost' onClick={openCaptureDialog}>Need to capture face first</div>
                                }
                            </div>
                        </div>
                        <div className='flex flex-col items-center space-y-5'>
                            <span className='font-mono'>3. Input Proof to KYC</span>
                            <div className='bg-gradient-to-r from-[#42275a] to-[#734b6d] card w-[350px] p-4 text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                                <div className='btn btn-ghost' onClick={openVerifyDialog}>Verify Proof</div>
                            </div>
                        </div>
                    </div>
                    <div className='divider'></div>

                    <p className='font-mono text-black font-bold text-3xl mb-4 dark:text-white'>
                        Proposal
                    </p>
                </div>
                <ProcessDialog
                    isOpen={isCaptureDialogOpen}
                    onClose={() => setIsCaptureDialogOpen(false)}
                    title={'Capture Face'}
                >
                    <WebcamCapture setImgSrc={setImgSrc} onClose={() => setIsCaptureDialogOpen(false)} />
                </ProcessDialog>
                <ProcessDialog
                    isOpen={isGenProofDialogOpen}
                    onClose={() => setIsGenProofDialogOpen(false)}
                    title={'Generate proof'}
                >
                    <GenerateProof imgSrc={imgSrc} handleCopyClick={handleCopyClick} setIsLoading={setIsLoading} onClose={() => setIsGenProofDialogOpen(false)} />
                </ProcessDialog>
                <ProcessDialog
                    isOpen={isVerifyDialogOpen}
                    onClose={() => setIsVerifyDialogOpen(false)}
                    title={'Verify proof'}
                >
                    <VerifyProof setVerified={setVerified} setIsLoading={setIsLoading} onClose={() => setIsVerifyDialogOpen(false)} />
                </ProcessDialog>
                {isLoading && <ProcessLoading />}
                {isKamuiLoading && <KamuiLoading />}
                {
                    copied &&
                    <div className='toast toast-top toast-end'>
                        <div className='alert alert-success'>
                            <span>Copied to clipboard</span>
                        </div>
                    </div>
                }
            </div>

        </div >

    )
}
