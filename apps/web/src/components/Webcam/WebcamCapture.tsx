'use client'

import Webcam from "react-webcam";
import React, { useRef, useState, useCallback, useEffect } from 'react';
import {sleep} from 'helper'

export interface WebcamCaptureProps {
    setImgSrc: any
    onClose: any
}

const WebcamCapture = ({setImgSrc, onClose}: WebcamCaptureProps) => {
    const webcamRef = useRef<Webcam>(null)
    const [imgSrc, setWebcamImg] = useState(null)

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setWebcamImg(imageSrc)
        setImgSrc(imageSrc)
    }, [webcamRef, setImgSrc]);

    const retryCapture = () => {
        setWebcamImg(null)
        setImgSrc(null)
    }

    return (
        <div className="flex flex-col items-center ">
            <div className="pb-4">
                {
                    imgSrc 
                    ? <img src={imgSrc} alt="webcam"/>
                    : <Webcam height={500} width={500} ref={webcamRef} mirrored={true} />
                }
            </div>
            <div className="flex flex-row space-x-3">
                {
                    imgSrc 
                    ? <div className="btn" onClick={retryCapture} >Recapture</div>
                    : <div className="btn" onClick={capture} >Capture</div>
                }
                {
                    imgSrc
                    ? <div className="btn" onClick={onClose} >OK</div>
                    : null
                }
            </div>
        </div>
    );
}

export default WebcamCapture;
