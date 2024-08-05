import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const CameraComponent = () => {
    const webcamRef = useRef(null);
    const [screenshot, setScreenshot] = useState(null);
    const [cameraEnabled, setCameraEnabled] = useState(false);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setScreenshot(imageSrc);

        // Вывод размера изображения в консоль
        if (imageSrc) {
            const base64Length = imageSrc.length - 'data:image/jpeg;base64,'.length;
            const padding = (imageSrc.endsWith('==')) ? 2 : (imageSrc.endsWith('=')) ? 1 : 0;
            const fileSize = (base64Length * (3 / 4)) - padding;

            console.log(`Image Size: ${fileSize} bytes`);
        }
    }, [webcamRef]);

    const handleCameraToggle = () => {
        setCameraEnabled((prev) => !prev);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            {cameraEnabled ? (
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width="100%"
                    style={{ maxWidth: '400px', margin: 'auto' }}
                />
            ) : (
                <div style={{ height: '400px', maxWidth: '400px', margin: 'auto', backgroundColor: '#ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>The camera is off</p>
                </div>
            )}
            <div>
                <button onClick={capture} style={{ margin: '20px', padding: '10px 20px' }} disabled={!cameraEnabled}>
                    Take a photo
                </button>
                <button onClick={handleCameraToggle} style={{ margin: '20px', padding: '10px 20px' }}>
                    {cameraEnabled ? 'Turn off the camera' : 'Turn on the camera'}
                </button>
            </div>
            {screenshot && (
                <div>
                    <h3>Your photo:</h3>
                    <img src={screenshot} alt="Selfie" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </div>
    );
};

export default CameraComponent;
