import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col justify-end items-start h-26 w-72 ">
      <h2 className="text-2xl font-bold">MODELS:</h2>
      <select className="p-3 text-black w-full">
        <option value="">Fetching OpenAi models.</option>
      </select>
    </div>
  );
};

export default LoadingSkeleton;
