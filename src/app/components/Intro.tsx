import React from "react";
import Logo from "./Logo";

function Intro(props: { setStarted: (value: boolean) => void }) {
  return (
    <div className="text-4xl font-bold text-center text-gray-800 dark:text-white my-auto">
      <div className="flex justify-center font-light items-center flex-col lg:flex-row gap-4">
        <h1 className="text-5xl">Welcome to</h1>
        <Logo />
      </div>
      <p className="text-2xl font-normal md:w-3/5 mx-auto mb-4 mt-2 px-4">
        This is a simple weather/travel app that helps you find the perfect
        destination for your next spontaneous trip.<br></br>
        <span className="font-semibold">In the next step</span> you will be
        asked what type of weather you would prefer, and{" "}
        <span className="font-semibold">our advanced algorithm</span> will come
        up with some suggestions.
        <span className="font-semibold">
          {" "}The app will keep updating the destinations as long you have the
          JustGO.. window opened.
        </span>
        <br></br>
        <br></br>
        <span className="text-gray-400">
          This is a simple example of SWR in Next.js.
        </span>
      </p>
      <div
        onClick={() => props.setStarted(true)}
        className="flex mx-auto w-fit flex-col items-center justify-center mt-12 animate-pulse hover:cursor-pointer hover:animate-none hover:scale-110 transition-all duration-300 ease-in-out"
      >
        <span className="text-6xl text-green-500">&#11166;</span>
        <span className="text-3xl">Lets go</span>
      </div>
    </div>
  );
}

export default Intro;
