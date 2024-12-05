import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import requestApi from '../helpers/api';
import DetailView from "./Detail";

const DetailDay = () => {
  // Lấy query string từ URL
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const location = useLocation();
  const challengeId = location.state?.challengeId;
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("No filter");
  const [selectedItem, setSelectedItem] = useState(null);
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
  
  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleItemClick = (item) => setSelectedItem(item);


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
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
                className="border rounded px-2 py-1"
              />
              <select
                value={filter}
                onChange={handleFilterChange}
                className="border rounded px-2 py-1"
              >
                <option value="No filter">No filter</option>
                <option value="Favorites">Favorites</option>
                <option value="Recent">Recent</option>
              </select>
              <button className="px-4 py-1 bg-gray-300 rounded">OK</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="border p-2 rounded flex items-center gap-2 cursor-pointer"
            >
              <FaStar className="text-gray-400" />
              {/* Sử dụng Link để điều hướng đến trang chi tiết video */}
              <Link to={`/video/${video.id}`} className="text-[#6ea8fe]">
                {video.title}
              </Link>
            </div>
          ))}
        </div>
    </>
  )
}
    </div >
  );
};

export default DetailDay;