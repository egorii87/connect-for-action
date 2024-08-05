import React, { useState, useEffect, useRef } from 'react';
import { ReactMic } from 'react-mic';

const VoiceRecorderMic = () => {
    const [recording, setRecording] = useState(false);
    const [blobURL, setBlobURL] = useState(null);
    const [time, setTime] = useState(0);
    const timerRef = useRef(null);

    const startRecording = () => {
        setRecording(true);
        setTime(0);
        timerRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);
    };

    const stopRecording = () => {
        setRecording(false);
        clearInterval(timerRef.current);
    };

    useEffect(() => {
        if (time >= 60) {
            stopRecording();
        }
    }, [time]);

    const onStop = (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob);
        setBlobURL(recordedBlob.blobURL);

        // Вывод размера аудио в консоль
        const fileSizeBytes = recordedBlob.blob.size;
        const fileSizeKB = (fileSizeBytes / 1024).toFixed(2);
        const fileSizeMB = (fileSizeBytes / (1024 * 1024)).toFixed(2);
        console.log(`MIC The size of the voice message: ${fileSizeBytes} bytes (${fileSizeKB} KB, ${fileSizeMB} MB)`);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <ReactMic
                record={recording}
                className="sound-wave"
                onStop={onStop}
                strokeColor="#000000"
                backgroundColor="#FF4081"
            />
            <div>
                <button onClick={startRecording} style={{ margin: '20px', padding: '10px 20px' }} disabled={recording}>
                    Start recording
                </button>
                <button onClick={stopRecording} style={{ margin: '20px', padding: '10px 20px' }} disabled={!recording}>
                    Stop recording
                </button>
            </div>
            {recording && <p>Recording: {time} seconds</p>}
            {blobURL && (
                <div>
                    <h3>Recorded audio:</h3>
                    <audio src={blobURL} controls="controls" />
                </div>
            )}
        </div>
    );
};

export default VoiceRecorderMic;
