import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Headphones, Keyboard, CheckCircle, Volume2 } from 'lucide-react';
import requestApi from '../helpers/api';

const Body = ({ theme }) => {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [videos, setVideos] = useState([]); // Trạng thái lưu danh sách video
  const [currentChallengeId, setCurrentChallengeId] = useState(null); // trạng thái để hiển thị tất cả video

  useEffect(() => {
    const fetchChallengesWithVideos = async () => {
      try {
        // Fetch danh sách challenges
        const response = await requestApi('/challenges/getAllChallenge', 'GET');
        const challengesData = response.data;

        // Lấy video cho từng challenge
        const challengesWithVideos = await Promise.all(
          challengesData.map(async (challenge) => {
            const videoResponse = await requestApi(`/challenges/video/${challenge.id}`, 'GET');
            return {
              ...challenge,
              videos: videoResponse.data.videos, // Gắn danh sách video vào challenge
            };
          })
        );

        setChallenges(challengesWithVideos);
      } catch (error) {
        console.error('Error fetching challenges or videos:', error);
      }
    };

    fetchChallengesWithVideos();
  }, []);



  const handleChallengeClick = (challengeId, challengeTitle) => {
    if (!challengeTitle) {
      console.error("Challenge title is undefined");
      return; // Dừng thực hiện nếu challengeTitle không hợp lệ
    }
  
    const slug = challengeTitle.toLowerCase().replace(/\s+/g, '-');
    navigate(`/challenge/${slug}`, { state: { challengeId } }); // Truyền challengeId qua state
  };

  return (
    <main
    className={`container mx-auto px-4 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
    } min-h-screen`}
  >
    <section className="text-left py-8 w-full mx-auto">
      <h1 className="text-[2.5rem] font-semibold mb-4 text-center sm:text-left">
        Practice English with Dictation Exercises
      </h1>
      <p className="mb-4 text-center sm:text-left">
        Dictation is a method to learn languages by listening and writing down what you hear. With
        these challenges, you'll practice with curated YouTube videos using subtitles for
        effective learning!
      </p>
      <button className="bg-[#6ea8fe] text-white px-6 py-2 rounded-lg hover:bg-[#4e8fd7] transition-all duration-300">
        Start Challenge
      </button>
      <span className="ml-2 text-sm">- It's 100% FREE!</span>
    </section>

    <section>
      <h2 className="text-[2rem] font-medium text-center mb-6">Available Challenges</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
        {challenges.map((challenge, index) => (
          <div
            key={index}
            className="border p-6 rounded-lg bg-gray-50 shadow-md transition-all hover:shadow-lg hover:scale-105 duration-300"
          >
            <h3 className="font-medium mb-2 text-[#6ea8fe] text-[1.75rem]">
              <button
                onClick={() => handleChallengeClick(challenge.id, challenge.title)}
                className="text-[#6ea8fe] underline"
              >
                {challenge.title}
              </button>
            </h3>
            <p className="mb-4 text-gray-600">{challenge.description}</p>
            <ul className="list-disc list-inside mb-4">
              {/* Hiển thị tên video */}
              {challenge.videos.map((video, videoIndex) => (
                <li key={videoIndex} className="text-[#6ea8fe] font-medium mb-1">
                   <Link to={`/video/${video.id}`} className="text-[#6ea8fe] underline">
                      {video.title}
                    </Link> {/* Hiển thị tên video và link đến trang chi tiết video */}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  </main>
  );
};

export default Body;
