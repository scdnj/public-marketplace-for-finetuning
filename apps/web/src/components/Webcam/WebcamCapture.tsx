'use client'

import Webcam from "react-webcam";
import React, { useRef, useState, useCallback } from 'react';


const WebcamCapture = () => {
    const webcamRef = useRef<Webcam>(null)
    const [imgSrc, setImgSrc] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    return (
        <div className="container">
            <Webcam height={600} width={600} ref={webcamRef} mirrored={true} />
            <div className="btn" onClick={capture} >Capture</div>
            {imgSrc && (
                <img
                    src={imgSrc}
                />
            )}
        </div>
    );
}

export default WebcamCapture;
