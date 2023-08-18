'use client'

import WebcamGenProof from '../../components/Webcam/WebcamGenProof'
import ProcessDialog from '../../components/Dialog/ProcessDialog'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export default function Vote() {
    const { address, isConnected } = useAccount()
    const [mounted, setMounted] = useState(false);
    const [isCaptureDialogOpen, setIsCaptureDialogOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState(null);
    
    async function openCaptureDialog() {
        setIsCaptureDialogOpen(!isCaptureDialogOpen)
      }

    useEffect(() => {
        if(isConnected){
            setMounted(true)
        }
    }, [address]);

    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full px-8 pt-8 pb-8">
                <div>
                    <p className="font-mono text-black font-bold text-3xl pt-2 dark:text-white mb-4">
                        Profile
                    </p>
                    <div className='bg-gradient-to-r from-[#42275a] to-[#734b6d] card w-[350px] p-4 text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                            {
                                imgSrc 
                                ? <div className='btn btn-ghost' onClick={openCaptureDialog}>Retry to generate proof</div>
                                : <div className='btn btn-ghost' onClick={openCaptureDialog}>Use Webcam to generate proof</div>
                            }
                    </div>
                    <div className='divider'></div>
                    
                    <p className="font-mono text-black font-bold text-3xl pt-2 dark:text-white">
                        Proposal
                    </p>
                </div>
                <ProcessDialog
                isOpen={isCaptureDialogOpen}
                onClose={()=>setIsCaptureDialogOpen(false)}
                title={'Capture proof'}
                >
                    <WebcamGenProof setImgSrc={setImgSrc} onClose={()=>setIsCaptureDialogOpen(false)}/>
                </ProcessDialog>       
            </div>
                 
        </div >
        
    );
}
