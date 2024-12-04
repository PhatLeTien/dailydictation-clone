import React from "react";
import shortstories from "../Images/short-stories.jpg";
import conversations from "../Images/conversations.jpg";
import toeiclistening from "../Images/toeic-listening.jpg";
import ieltslistening from "../Images/ielts-listening.jpg";
import youtube from "../Images/youtube.jpg";
import ted from "../Images/ted.jpeg";
import toefllistening from "../Images/toefl-listening.jpg";
import ipa from "../Images/ipa.jpeg";
import numbers from "../Images/numbers.jpg";
import names from "../Images/names.jpg";

const topics = [
  {
    title: "Short Stories",
    level: "Medium",
    numberOfLessons: "289",
    img: shortstories,
  },
  {
    title: "Conversations",
    level: "Medium",
    numberOfLessons: "100",
    img: conversations,
  },
  {
    title: "TOEIC Listening",
    level: "Hard",
    numberOfLessons: "540",
    img: toeiclistening,
  },
  {
    title: "IELTS Listening",
    level: "Hard",
    numberOfLessons: "328",
    img: ieltslistening,
  },
  { title: "YouTube", level: "Hard", numberOfLessons: "101", img: youtube },
  { title: "TED & TED-Ed", level: "Hard", numberOfLessons: "36", img: ted },
  {
    title: "TOEFL Listening",
    level: "Hard",
    numberOfLessons: "54",
    img: toefllistening,
  },
  { title: "IPA", level: "Easy", numberOfLessons: "42", img: ipa },
  { title: "Numbers", level: "Easy", numberOfLessons: "9", img: numbers },
  { title: "Spelling Names", level: "Easy", numberOfLessons: "6", img: names },
];

const AllExercises = ({ theme }) => {
  const getLevelColor = (level) => {
    switch (level) {
      case "Easy":
        return "text-green-700 font-bold";
      case "Medium":
        return "text-blue-500 font-bold";
      case "Hard":
        return "text-yellow-500 font-bold";
      default:
        return "text-gray-600 font-bold";
    }
  };

  return (
    <div
      className={`w-full min-h-screen flex justify-center mt-20 ${
        theme === "dark" ? "bg-gray-900 text-gray-400" : "bg-white text-black"
      }`}
    >
      <div className="max-w-4xl w-full">
        {/* EXERCISES */}
        <h1 className="text-3xl font-semibold my-5">All topics</h1>
        <div className="grid grid-cols-3 gap-5">
          {topics.map((item, index) => (
            <div
              key={index}
              className={`px-3 border shadow-lg rounded flex gap-3 ${
                theme === "dark" ? "border-gray-500 bg-slate-800" : "border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className={`w-24 h-24 border p-2 rounded ${
                    theme === "dark" ? "border-gray-500" : "border-gray-300"
                  }`}
                />
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <p className="text-blue-500 font-semibold underline text-2xl">
                  {item.title}
                </p>
                <p>
                  Level:{" "}
                  <span className={getLevelColor(item.level)}>
                    {item.level}
                  </span>
                </p>
                <p>{item.numberOfLessons} lessons</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllExercises;
