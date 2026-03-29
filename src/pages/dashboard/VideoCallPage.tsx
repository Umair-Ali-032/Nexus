import React from "react";
import VideoCall from "../../components/VideoCall";

const VideoCallPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <VideoCall />
    </div>
  );
};

export default VideoCallPage;