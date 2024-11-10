import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight, FaRedo } from "react-icons/fa";

const data = [
  { id: 1, title: "Day 1 - Video" },
  { id: 2, title: "Day 2 - Video" },
  { id: 3, title: "Day 3 - Video" },
];

const DetailView = ({ title, onBack }) => {
  return (
    <div className="p-4 border rounded shadow-lg bg-white max-w-lg mx-auto">
      <button onClick={onBack} className="mb-4 bg-gray-300 px-2 py-1 rounded">
        Quay lại
      </button>

      {/* Header with Navigation */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          <FaRedo className="cursor-pointer text-blue-500" title="Replay" />
          <span>1 / 125</span>
          <FaArrowLeft className="cursor-pointer" title="Previous" />
          <FaArrowRight className="cursor-pointer" title="Next" />
        </div>
      </div>

      {/* Video Section */}
      <div className="border rounded mb-4 overflow-hidden shadow">
        <video controls className="w-full">
          <source src="video_file_url.mp4" type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      </div>

      {/* Input Field and Buttons */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Type what you hear..."
          className="border rounded w-full px-2 py-1"
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded">Check</button>
        <button className="border px-4 py-1 rounded">Skip</button>
      </div>

      {/* Video Options */}
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
    </div>
  );
};

const Detail3Day = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("No filter");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleItemClick = (item) => setSelectedItem(item);
  const handleBack = () => setSelectedItem(null);

  return (
    <div className="p-5">
      {selectedItem ? (
        <DetailView title={selectedItem.title} onBack={handleBack} />
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">3-Day Daily Conversations</h2>
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
            {data.map((item) => (
              <div
                key={item.id}
                className="border p-2 rounded flex items-center gap-2 cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <FaStar className="text-gray-400" />
                <p className="text-blue-500">{`${item.id}. ${item.title}`}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Detail3Day;
