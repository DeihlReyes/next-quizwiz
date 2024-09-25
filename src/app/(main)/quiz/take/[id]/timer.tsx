"use client";

import { useEffect, useState } from "react";

import { Clock } from "lucide-react";

interface TimerProps {
  isFinished: boolean;
  onTimeUpdate: (time: number) => void;
}

export function Timer({ isFinished, onTimeUpdate }: TimerProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isFinished) {
        setTimeElapsed((prevTime) => {
          const newTime = prevTime + 1;
          onTimeUpdate(newTime);
          return newTime;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished, onTimeUpdate]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <span className="flex items-center text-sm font-normal">
      <Clock className="mr-2 h-4 w-4" />
      Time: {formatTime(timeElapsed)}
    </span>
  );
}
