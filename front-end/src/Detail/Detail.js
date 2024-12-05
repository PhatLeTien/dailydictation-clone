import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight, FaRedo } from "react-icons/fa";
import requestApi from '../helpers/api';

const DetailView = ({ title, videoUrl, transcriptFile, onBack }) => {
  const [transcript, setTranscript] = useState([]);
  const [inputText, setInputText] = useState("");
  const [currentCaption, setCurrentCaption] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [completedCount, setCompletedCount] = useState(0); // Đếm số câu đã hoàn thành
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const [isStarted, setIsStarted] = useState(false);
  const [currentCaptionIndex, setCurrentCaptionIndex] = useState(0);
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);


  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await requestApi(`/videos/getVideo/${videoId}`, 'GET');
        if (response.status !== 200) {
          throw new Error('Video not found');
        }
        const videoData = response.data;
        setVideo(videoData);

        // Lấy đường dẫn transcript và gọi hàm fetchAndParseVTT
        if (videoData.transcript_path) {
          fetchAndParseVTT(videoData.transcript_path);
        }
      } catch (err) {
        console.error('Error fetching video:', err);
      }
    };

    fetchVideo();
  }, [videoId]);



  const timeToSeconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");
    return parseFloat(hours) * 3600 + parseFloat(minutes) * 60 + parseFloat(seconds);
  };

  const fetchAndParseVTT = async (transcriptFile) => {
    try {
      const response = await fetch(`/transcripts/${transcriptFile}`);
      const vttText = await response.text();
      const cuePattern = /(\d{2}:\d{2}:\d{2}.\d{3}) --> (\d{2}:\d{2}:\d{2}.\d{3})\s*(?:position:[^%]*%)?\n([^]*?)(?=\n{2}|\s*$)/g;
      const transcriptData = [];
      let match;

      while ((match = cuePattern.exec(vttText)) !== null) {
        transcriptData.push({
          startTime: timeToSeconds(match[1]),
          endTime: timeToSeconds(match[2]),
          captionText: match[3].trim(),
          originalStartTime: match[1],
          originalEndTime: match[2]
        });
      }

      setTranscript(transcriptData);
    } catch (error) {
      console.error("Error fetching VTT file:", error);
    }
  };

  useEffect(() => {
    if (video) {
      const loadYouTubeAPI = () => {
        if (!window.YT) {
          const script = document.createElement("script");
          script.src = "https://www.youtube.com/iframe_api";
          document.body.appendChild(script);
        }

        window.onYouTubeIframeAPIReady = initializePlayer;
      };

      const initializePlayer = () => {
        const videoId = new URL(video.url).searchParams.get("v");
        playerRef.current = new window.YT.Player(videoRef.current, {
          videoId,
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      };

      const onPlayerReady = () => {
        console.log("YouTube Player is ready");
      };

      const onPlayerStateChange = (event) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
          intervalRef.current = setInterval(() => {
            const currentVideoTime = playerRef.current.getCurrentTime();
            setCurrentTime(currentVideoTime);
          }, 100);
        } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
          clearInterval(intervalRef.current);
        }
      };

      loadYouTubeAPI();

      if (video.transcript_path) {
        fetchAndParseVTT(video.transcript_path);
      }

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        window.onYouTubeIframeAPIReady = null;
      };
    }
  }, [video]);

  useEffect(() => {
    if (playerRef.current && transcript.length > 0 && isStarted) {
      const currentCaption = transcript[currentCaptionIndex];
      if (currentTime >= currentCaption.startTime && currentTime <= currentCaption.endTime) {

        setCurrentCaption(currentCaption);

        if (currentTime >= currentCaption.endTime - 0.2) {
          playerRef.current.pauseVideo();
          setCompletedCount(currentCaptionIndex + 1);
          setCurrentCaptionIndex(currentCaptionIndex);
        }
      }
    }
  }, [currentTime, transcript, currentCaption, isStarted, currentCaptionIndex]);

  const checkSpelling = () => {
    if (currentCaption) {
      const input = inputText.trim().toLowerCase().replace(/\s+/g, ' '); // Xử lý khoảng trắng thừa
      const caption = currentCaption.captionText.trim().toLowerCase().replace(/\s+/g, ' ');

      if (input === caption) {
        setFeedbackMessage("Correct! Well done.");
      } else {
        setFeedbackMessage(`Oops! The correct caption is: "${currentCaption.captionText}"`);
      }
    }
  };


  const handleContinue = () => {
    if (currentCaption) {
      setInputText(currentCaption.captionText); // Điền nội dung vào ô input

    }
  };

  const handleStartDictation = () => {
    setIsStarted(true);
    if (playerRef.current) {
      playerRef.current.seekTo(0, true);
      playerRef.current.playVideo();
    }
  };



  const handlePrevCaption = () => {
    if (currentCaptionIndex > 0) {
      setCurrentCaptionIndex(currentCaptionIndex - 1);
      const prevCaption = transcript[currentCaptionIndex - 1];
      if (playerRef.current) {
        playerRef.current.seekTo(prevCaption.startTime, true);
        playerRef.current.playVideo();
      }
    }
  };

  const handleNextCaption = () => {

    if (currentCaptionIndex < transcript.length - 1) {
      setCurrentCaptionIndex(currentCaptionIndex + 1);
      const nextCaption = transcript[currentCaptionIndex + 1];
      if (playerRef.current) {
        playerRef.current.seekTo(nextCaption.startTime, true);
        playerRef.current.playVideo();
      }
    }
  };


  return (
    <div className="p-4 border rounded shadow-lg bg-white max-w-lg mx-auto">
      <button onClick={onBack} className="mb-4 bg-gray-300 px-2 py-1 rounded">
        Quay lại
      </button>
      <div className="flex justify-between items-center mb-4">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-semibold">{video?.title}</h2>

        {/* Điều khiển */}
        {isStarted && (
          <div className="flex items-center gap-2">
            {/* Replay */}
            <FaRedo
              className="cursor-pointer text-blue-500"
              title="Replay"
            />
            {/* Current Caption */}
            <span className="min-w-[50px] text-center">
              {currentCaptionIndex + 1} / {transcript.length}
            </span>
            {/* Previous */}
            <FaArrowLeft
              className={`cursor-pointer ${currentCaptionIndex === 0 ? "text-gray-400 cursor-not-allowed" : "text-blue-500"}`}
              title="Previous"
              onClick={handlePrevCaption}
            />
            {/* Next */}
            <FaArrowRight
              className={`cursor-pointer ${currentCaptionIndex === transcript.length - 1 ? "text-gray-400 cursor-not-allowed" : "text-blue-500"}`}
              title="Next"
              onClick={handleNextCaption}
            />
          </div>
        )}

      </div>

      <div className="border rounded mb-4 overflow-hidden shadow">
        <div ref={videoRef} className="video-player" style={{ width: "100%", height: "315px" }} />
      </div>

      {isStarted && (
        <>
          <div className="mb-4">
            {currentCaption && (
              <div className="bg-gray-100 p-4 rounded">
                <p className="font-bold mb-2">Current Caption:</p>
                <p>{currentCaption.captionText}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-4 mb-4">
            {/* Input Text */}
            <textarea
  value={inputText}
  onChange={(e) => setInputText(e.target.value)}
  placeholder="Type what you hear..."
  className="border rounded w-full max-w-md px-4 py-3 text-lg h-32 resize-none"
/>


            {/* Buttons */}
            <div className="flex gap-4">
              <button onClick={checkSpelling} className="bg-blue-500 text-white px-6 py-2 rounded">
                Check
              </button>
              <button onClick={handleContinue} className="border px-6 py-2 rounded">
                Skip
              </button>
            </div>
          </div>


          {/* Hiển thị phản hồi chính tả */}
          {feedbackMessage && (
            <div className={`mt-4 p-2 text-center rounded ${feedbackMessage.includes("Correct") ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {feedbackMessage}
            </div>
          )}


          <div className="flex justify-between items-center">
            <div>
              <label htmlFor="videoSize" className="mr-2 text-sm">Video size:</label>
              <select id="videoSize" className="border rounded px-2 py-1">
                <option value="large">Large</option>
                <option value="medium">Medium</option>
                <option value="small">Small</option>
              </select>
            </div>
            <button className="px-4 py-1 border rounded">Hide video</button>
          </div>


        </>
      )}

      {!isStarted && (
        <button onClick={handleStartDictation} className="bg-blue-500 text-white px-4 py-2 rounded">
          Start Dictation
        </button>
      )}
    </div>
  );
};

export default DetailView;





