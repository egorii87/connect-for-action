import './App.css';
import CameraComponent from "./components/CameraComponent";
import VoiceRecorderMic from "./components/VoiceRecorderMic";
import VoiceRecorderRAVR from "./components/VoiceRecorderRAVR";

function App() {
  return <div className="App">
    <header className="App-header">
      <h1>An app for selfies and voice recordings</h1>
    </header>
    <CameraComponent/>
    <VoiceRecorderMic />
    <VoiceRecorderRAVR />
  </div>
}

export default App;
