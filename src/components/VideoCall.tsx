
// src/components/VideoCall.tsx
import React, { useRef, useState } from "react";
import "./VideoCall.css";

const VideoCall: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null); // for mock remote
  const [isCallActive, setIsCallActive] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const startCall = async () => {
    setIsCallActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      // Mock remote: just mirror local for now
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing camera/mic:", err);
    }
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsScreenSharing(false);
    [localVideoRef, remoteVideoRef].forEach(ref => {
      if (ref.current && ref.current.srcObject) {
        const tracks = (ref.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        ref.current.srcObject = null;
      }
    });
  };

  const toggleVideo = () => {
    setVideoEnabled(prev => {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const videoTrack = (localVideoRef.current.srcObject as MediaStream)
          .getVideoTracks()[0];
        if (videoTrack) videoTrack.enabled = !prev;
      }
      return !prev;
    });
  };

  const toggleAudio = () => {
    setAudioEnabled(prev => {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const audioTrack = (localVideoRef.current.srcObject as MediaStream)
          .getAudioTracks()[0];
        if (audioTrack) audioTrack.enabled = !prev;
      }
      return !prev;
    });
  };

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      setIsScreenSharing(true);

      // Stop screen share when tracks end
      const track = stream.getVideoTracks()[0];
      track.onended = () => {
        setIsScreenSharing(false);
        startCall(); // revert to webcam
      };
    } catch (err) {
      console.error("Screen share error:", err);
    }
  };

  return (
    <div className="video-call-container">
      <h2 className="text-xl font-bold mb-4">Video Call</h2>
      <div className="videos">
        <video ref={localVideoRef} autoPlay muted className="video-box" />
        <video ref={remoteVideoRef} autoPlay className="video-box" />
      </div>
      <div className="controls mt-4 flex gap-3">
        {!isCallActive ? (
          <button onClick={startCall} className="btn-primary">
            Start Call
          </button>
        ) : (
          <>
            <button onClick={endCall} className="btn-red">
              End Call
            </button>
            <button onClick={toggleVideo} className="btn-gray">
              {videoEnabled ? "Turn Video Off" : "Turn Video On"}
            </button>
            <button onClick={toggleAudio} className="btn-gray">
              {audioEnabled ? "Mute" : "Unmute"}
            </button>
            {!isScreenSharing && (
              <button onClick={startScreenShare} className="btn-gray">
                Share Screen
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoCall;