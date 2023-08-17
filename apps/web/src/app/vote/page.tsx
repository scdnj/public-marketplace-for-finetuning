import WebcamCapture from '../../components/Webcam/WebcamCapture'

export default function Vote() {
    return (
        <div className="flex flex-col items-center mt-100">
            <div className="justify-center">
                <div>
                    <WebcamCapture />
                </div>
                <div>
                    <WebcamCapture />
                </div>
            </div>
        </div >
    );
}
