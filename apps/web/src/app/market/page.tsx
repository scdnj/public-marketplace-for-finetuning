'use client'

import { getTotalWeightList, getUserWeight } from '../../service/weightMarket/contract'
import ProcessDialog from '../../components/Dialog/ProcessDialog'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import ModelWeightCard from "../../components/Card/ModelWeightCard";
import { ConnectKitButton } from 'connectkit'
import BuyModelConfirm from '../../components/Contract/BuyModelConfirm'


export default function Market() {
    const { address, isConnected } = useAccount()
    const [mounted, setMounted] = useState(false)
    const [isCaptureDialogOpen, setIsCaptureDialogOpen] = useState(false)
    const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false)
    const [isGenProofDialogOpen, setIsGenProofDialogOpen] = useState(false)
    const [isCreateProposalDialogOpen, setIsCreateProposalDialogOpen] = useState(false)
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
    const [models, setModels] = useState<any>([]);
    const [userModels, setUserModels] = useState<any>([]);
    const [proposalStatus, setProposalStatus] = useState("init")

    const [selectedModelWeightId, setModelWeightId] = useState(null)
    const [selectedModelWeightName, setModelWeightName] = useState(null)

    useEffect(() => {
        if (isConnected) {
            setMounted(true)
        } else {
            setMounted(false)
        }
    }, [address, isConnected])

    useEffect(() => {
        if (mounted) {
            getTotalWeightList().then((res) => {
                setModels(res);
            });
            getUserWeight(address).then((res) => {
                setUserModels(res);
            });
        }
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
                            {models.map((model: any, index: number) => {
                                const [name, url, uploadType, price] = model
                                return (
                                    <ModelWeightCard
                                        key={index}
                                        modelId={index}
                                        modelName={name}
                                        modelKey={url}
                                        storageType={uploadType}
                                        modelPrice={price}
                                        isBuy={userModels.includes(url)}
                                        setIsConfirmDialogOpen={setIsConfirmDialogOpen}
                                        setModelWeightId={setModelWeightId}
                                        setModelWeightName={setModelWeightName}
                                    />
                                );
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
                <ProcessDialog
                    isOpen={isConfirmDialogOpen}
                    onClose={() => setIsConfirmDialogOpen(false)}
                    title={selectedModelWeightName}
                >
                    <BuyModelConfirm modelId={selectedModelWeightId} onClose={() => setIsConfirmDialogOpen(false)} />
                </ProcessDialog>
            </div>

        </div >
    )
}
