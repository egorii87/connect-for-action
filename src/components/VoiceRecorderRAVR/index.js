import React, { useState, useEffect, useRef } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

const VoiceRecorderRAVR = () => {
    const recorderControls = useAudioRecorder();
    const [blobURL, setBlobURL] = useState(null);
    const [time, setTime] = useState(0);
    const timerRef = useRef(null);

    const startRecording = () => {
        recorderControls.startRecording();
        setTime(0);
        timerRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);
    };

    const stopRecording = () => {
        recorderControls.stopRecording();
        clearInterval(timerRef.current);
    };

    const handleAudioStop = (data) => {
        setBlobURL(URL.createObjectURL(data));
        const fileSizeBytes = data.size;
        const fileSizeKB = (fileSizeBytes / 1024).toFixed(2);
        const fileSizeMB = (fileSizeBytes / (1024 * 1024)).toFixed(2);
        console.log(`RAVR The size of the voice message: ${fileSizeBytes} bytes (${fileSizeKB} KB, ${fileSizeMB} MB)`);
    };

    useEffect(() => {
        if (time >= 60) {
            stopRecording();
        }
    }, [time]);

    return (
        <div style={{ textAlign: 'center', margin: '0 auto'}}>
            <AudioRecorder
                onRecordingComplete={handleAudioStop}
                recorderControls={recorderControls}
            />
            <div>
                <button onClick={startRecording} style={{ margin: '20px auto', padding: '10px 20px' }} disabled={recorderControls.isRecording}>
                    Start recording
                </button>
                <button onClick={stopRecording} style={{ margin: '20px', padding: '10px 20px' }} disabled={!recorderControls.isRecording}>
                    Stop recording
                </button>
            </div>
            {recorderControls.isRecording && <p>Recording: {time} seconds</p>}
            {blobURL && (
                <div>
                    <h3>Recorded audio:</h3>
                    <audio src={blobURL} controls="controls" />
                </div>
            )}
        </div>
    );
};

export default VoiceRecorderRAVR;
