import React, { useState, useRef } from "react";
import "./ImageViewer.css";

function VideoViewer() {
  // Declare state variables
  const [videoUrl, setVideoUrl] = useState(""); // stores the URL of the uploaded video
  const [isPlaying, setIsPlaying] = useState(false); // stores whether the video is currently playing or not

  // Declare a ref to the <video> element
  const videoRef = useRef(null);

  // Function to handle video upload
  function handleVideoUpload(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  }

  // Function to handle playing the video
  function handlePlay() {
    videoRef.current.play(); // Play the video using the ref to the <video> element
    setIsPlaying(true); // Set isPlaying to true
  }

  // Function to handle pausing the video
  function handlePause() {
    videoRef.current.pause(); // Pause the video using the ref to the <video> element
    setIsPlaying(false); // Set isPlaying to false
  }

  return (
    <div>
      <div>
        {/* Title and file upload button */}
        <h3>Video Viewer</h3>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          id="file-input"
          style={{ display: "none" }}
        />
        <label htmlFor="file-input" className="custom-file-upload">
          Upload Video
        </label>

        {/* Play/Pause button */}
        <button
          disabled={!videoUrl} // Disable the button if no video has been uploaded
          onClick={isPlaying ? handlePause : handlePlay} // Call the appropriate function based on whether the video is currently playing or not
        >
          {isPlaying ? "Pause" : "Play"} // Display "Pause" if the video is currently playing, otherwise display "Play"
        </button>
      </div>

      {/* Video player */}
      <div>
        <video
          style={{ width: "640px", height: "360px" }}
          ref={videoRef} // Assign the ref to the <video> element
          src={videoUrl} // Set the source of the <video> element to the uploaded video URL
          controls={false} // Disable the default controls
        />
      </div>
    </div>
  );
}

export default VideoViewer;
