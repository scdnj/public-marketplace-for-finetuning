'use client'

import WebcamCapture from '../../components/Webcam/WebcamCapture'
import ProcessDialog from '../../components/Dialog/ProcessDialog'
import GenerateProof from '../../components/ZK/GenerateProof'
import CreateProposal from '../../components/Contract/CreateProposal'
import { getProposals } from '../../service/kamui/contract'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import ProposalCard from "../../components/Card/ProposalCard";
import dayjs from "dayjs";
import { ConnectKitButton } from 'connectkit'
import VoteConfirm from '../../components/Contract/VoteConfirm'

export default function Market() {
    const { address, isConnected } = useAccount()
    const [mounted, setMounted] = useState(false)
    const [isCaptureDialogOpen, setIsCaptureDialogOpen] = useState(false)
    const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false)
    const [isGenProofDialogOpen, setIsGenProofDialogOpen] = useState(false)
    const [isCreateProposalDialogOpen, setIsCreateProposalDialogOpen] = useState(false)
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
    const [imgSrc, setImgSrc] = useState(null)
    const [copied, setCopied] = useState(false)
    const [proposals, setProposals] = useState<any>([]);
    const [proposalStatus, setProposalStatus] = useState("init")
    const [proof, setProof] = useState(null)

    const [selectedAction, setAction] = useState(null)
    const [selectedProposalId, setProposalId] = useState(null)
    const [selectedProposalContent, setProposalsContent] = useState(null)

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
        setProof(false)
    }, [address, isConnected])

    useEffect(() => {
        if (mounted) getProposals().then((res) => {
            setProposals(res);
        });
    }, [mounted]);

    return (
        <div className='flex items-center justify-center'>
            <div className='mx-auto w-full px-8 pt-8 pb-8'>
                <div className='flex-col'>
                    <div className='flex flex-row space-x-3 items-center'>
                        <p className='font-mono text-black font-bold text-3xl dark:text-white my-4'>
                            Model Weight Market
                        </p>
                    </div>
                    {mounted
                        ? <div className="mb-10 grid xl-[1320px] xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center">
                            {proposals.map((proposal: any, index: number) => {
                                const [name, creator, acceptCount, denyCount, endTime] = proposal
                                let status = "Open"
                                if (Date.now().valueOf() > new Date(dayjs.unix(Number(endTime)).format("MM/DD/YYYY HH:mm:ss")).valueOf()) {
                                    status = "Closed"
                                }
                                if (proposalStatus === status || proposalStatus === "All" || proposalStatus === "init") {
                                    return (
                                        <ProposalCard
                                            proposalId={index}
                                            creator={creator}
                                            proposalBody={name}
                                            acceptCount={Number(acceptCount)}
                                            denyCount={Number(denyCount)}
                                            endTime={Number(endTime)}
                                            proof={proof}
                                            status={status}
                                            key={index}
                                            setIsConfirmDialogOpen={setIsConfirmDialogOpen}
                                            setAction={setAction}
                                            setProposalId={setProposalId}
                                            setProposalsContent={setProposalsContent}
                                        />
                                    );
                                }
                            })
                            }
                        </div>
                        : <div className="flex items-center justify-center">
                            <ConnectKitButton.Custom>
                                {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
                                    return (
                                        <button className="btn btn-primary" onClick={show}>
                                            {isConnected ? address : "Connect Wallet"}
                                        </button>
                                    );
                                }}
                            </ConnectKitButton.Custom>
                        </div>
                    }
                </div>
            </div>

        </div >
    )
}
