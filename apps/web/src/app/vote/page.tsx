'use client'

import WebcamCapture from '../../components/Webcam/WebcamCapture'
import ProcessDialog from '../../components/Dialog/ProcessDialog'
import GenerateProof from '../../components/ZK/GenerateProof'
import VerifyProof from '../../components/ZK/VerifyProof'
import CreateProposal from '../../components/Contract/CreateProposal'
import ProcessLoading from '../../components/Loading/ProcessLoading'
import KamuiLoading from '../../components/Loading/KamuiLoading'
import { getProposals } from '../../service/kamui/contract'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import dayjs from "dayjs";
import ProposalCard from "../../components/Card/ProposalCard";

export default function Vote() {
    const [isLoading, setIsLoading] = useState(false);
    const [isKamuiLoading, setIsKamuiLoading] = useState(false);
    const { address, isConnected } = useAccount()
    const [mounted, setMounted] = useState(false)
    const [isCaptureDialogOpen, setIsCaptureDialogOpen] = useState(false)
    const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false)
    const [isGenProofDialogOpen, setIsGenProofDialogOpen] = useState(false)
    const [isCreateProposalDialogOpen, setIsCreateProposalDialogOpen] = useState(false)
    const [isVerified, setVerified] = useState(false)
    const [imgSrc, setImgSrc] = useState(null)
    const [copied, setCopied] = useState(false)
    const [proposals, setProposals] = useState<any>([]);
    const [proposalStatus, setProposalStatus] = useState("init")
    const [credentialHash, setCredentialHash] = useState("");

    const openCaptureDialog = async () => {
        setIsCaptureDialogOpen(!isCaptureDialogOpen);
    };

    const openGenProofDialog = async () => {
        setIsGenProofDialogOpen(!isGenProofDialogOpen);
    };

    const openVerifyDialog = async () => {
        setIsVerifyDialogOpen(!isVerifyDialogOpen);
    };

    const openCreateProposalDialog = async () => {
        setIsCreateProposalDialogOpen(!isCreateProposalDialogOpen)
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

    useEffect(() => {
        getProposals().then((res) => {
            setProposals(res);
        });
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs as any} >

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
                        <div className='container w-full flex flex-row space-x-3 items-center'>
                            <div className="flex w-full justify-start">
                                <p className='font-mono text-black font-bold text-3xl dark:text-white my-4'>
                                    KAMUI FIELD
                                </p>
                            </div>
                            <div className='flex w-full justify-end'>
                                <div className='btn bg-primary hover:bg-primary-focus' onClick={openCreateProposalDialog}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#A6ADBA" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM12.75 12a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V18a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V12z" clipRule="evenodd" />
                                        <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                                    </svg>
                                    <span className='text-base-content'>New Proposal</span>
                                </div>
                            </div>
                        </div>
                        <div className="mb-10 grid xl-[1320px] xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center">
                            {proposals.map((proposal: any, index: number) => {
                                let status = "Open"
                                if (Date.now().valueOf() > new Date(dayjs.unix(proposal.endTime).format("MM/DD/YYYY HH:mm:ss")).valueOf()) {
                                    status = "Closed"
                                }
                                if (proposalStatus === status || proposalStatus === "All" || proposalStatus === "init") {
                                    return (
                                        <ProposalCard
                                            proposalId={index}
                                            creater={proposal.creater}
                                            proposalBody={proposal.name}
                                            acceptCount={proposal.acceptCount}
                                            denyCount={proposal.denyCount}
                                            endTime={proposal.endTime}
                                            credentialHash={credentialHash}
                                            status={status}
                                            key={index}
                                        />
                                    );
                                }
                            })}
                        </div>
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
                    <ProcessDialog
                        isOpen={isCreateProposalDialogOpen}
                        onClose={() => setIsCreateProposalDialogOpen(false)}
                        title={'New Proposal'}
                    >
                        <CreateProposal setIsLoading={setIsLoading} onClose={() => setIsCreateProposalDialogOpen(false)} />
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
        </LocalizationProvider>

    )
}
