import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex space-x-1">
          {"OutGame".split("").map((letter, index) => (
            <span
              key={index}
              className="text-pink-500 text-4xl font-bold animate-bounce"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: "1s",
                animationIterationCount: "infinite",
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
