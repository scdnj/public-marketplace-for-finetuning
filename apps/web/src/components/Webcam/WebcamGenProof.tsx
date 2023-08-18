'use client'

import Webcam from "react-webcam";
import React, { useRef, useState, useCallback } from 'react';
import {sleep} from 'utilsx'

export interface WebcamCaptureProps {
    setImgSrc: any
    onClose: any
}

const WebcamGenProof = ({setImgSrc, onClose}: WebcamCaptureProps) => {
    const webcamRef = useRef<Webcam>(null)
    const [isCaptured, setIsCaptured] = useState(false)

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setIsCaptured(true)
        setImgSrc(imageSrc)
    }, [webcamRef, setImgSrc]);

    const generateProof = async () => {
        console.log('generate proof')
        await sleep(2000)
        onClose()
    }

    return (
        <div className="flex flex-col items-center">
            <div className="pb-4">
                <Webcam height={600} width={600} ref={webcamRef} mirrored={true} />
            </div>
            {
                isCaptured 
                ? <div className="btn" onClick={capture} >Capture</div>
                : <div className="btn" onClick={capture} >Retry to Capture</div>
            }
            {
                isCaptured
                ? <div className="btn" onClick={generateProof} >Generate Proof</div>
                : null
            }
        </div>
    );
}

export default WebcamGenProof;
