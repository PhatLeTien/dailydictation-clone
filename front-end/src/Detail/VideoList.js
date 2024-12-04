import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import requestApi from '../helpers/api';
import DetailView from "./Detail";

const DetailDay = () => {
    // Lấy query string từ URL
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const location = useLocation();
    const challengeId = location.state?.challengeId;
   // Lấy id từ query string
    
    useEffect(() => {
      const fetchVideos = async () => {
        try {
          const response = await requestApi(`/challenges/video/${challengeId}`, 'GET');
          setVideos(response.data.videos);
        } catch (error) {
          console.error('Error fetching challenges:', error);
        }
      };
  
      fetchVideos();
    }, [challengeId]);
  
    const handleVideoClick = (video) => setSelectedVideo(video);
    const handleBack = () => setSelectedVideo(null);
  
    return (
      <div className="p-5">
        {selectedVideo ? (
          <DetailView
            title={selectedVideo.title}
            transcriptFile={selectedVideo.transcript_path}
            videoUrl={selectedVideo.url}
            onBack={handleBack}
          />
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">Danh sách Video</h2>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="border p-2 rounded flex items-center gap-2 cursor-pointer"
                  onClick={() => handleVideoClick(video)}
                >
                  <FaStar className="text-gray-400" />
                  <p className="text-blue-500">{video.title}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default DetailDay;