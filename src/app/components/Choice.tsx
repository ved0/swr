import React from "react";
import Logo from "./Logo";

function Choice(props: { choiceMade: (value: string) => void }) {
  return (
    <div className="flex flex-col text-2xl text-center text-gray-800 dark:text-white my-auto">
      <Logo />
      <span className="pb-8 pt-4 text-3xl">
        You could be one step away from your next dream destination.
      </span>
      <span className="font-bold ">The choice is yours</span>
      <div className="flex justify-evenly mt-12">
        <div
          onClick={() => props.choiceMade("cold")}
          className="w-44 h-44 lg:w-60 lg:h-60 flex-col text-gray-600 hover:text-gray-900 bg-blue-100 flex justify-center items-center rounded-2xl hover:bg-blue-300 transition-all duration-500 hover:cursor-pointer hover:scale-110"
        >
          <span className="text-8xl font-mono text-blue-500">&#10052;</span>
          <span>Winter wonderland</span>
        </div>
        <div
          onClick={() => props.choiceMade("sunny")}
          className="w-44 h-44 lg:w-60 lg:h-60 flex-col text-gray-600 hover:text-gray-900 bg-amber-100 flex justify-center items-center rounded-2xl hover:bg-amber-200 transition-all duration-500 hover:cursor-pointer hover:scale-110"
        >
          <span className="text-8xl font-mono text-amber-500">&#9728;</span>
          <span>Summer adventure</span>
        </div>
      </div>
    </div>
  );
}

export default Choice;
