"use client";
import { useState } from "react";
import Intro from "./Intro";
import Choice from "./Choice";
import Destinations from "./Destinations";

export default function Main() {
  const [choice, setChoice] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState(false);

  const choiceMade = (choice: string) => {
    setSelected(true);
    setChoice(choice);
  };

  const goBack = () => {
    setSelected(false);
    setChoice(null);
  };

  return (
    <div className="w-full h-full font-sans flex justify-center items-start">
      {!started ? (
        <Intro setStarted={setStarted} />
      ) : !selected ? (
        <Choice choiceMade={choiceMade} />
      ) : (
        <Destinations goBack={goBack} choice={choice} />
      )}
    </div>
  );
}
