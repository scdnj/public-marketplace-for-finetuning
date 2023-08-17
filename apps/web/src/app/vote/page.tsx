import WebcamCapture from '../../components/Webcam/WebcamCapture'

export default function Vote() {
    return (
        <div className="flex flex-col items-center justify-center" style={{ height: 'calc(100vh - 216px)' }}>
            <WebcamCapture />
        </div>
    );
}
