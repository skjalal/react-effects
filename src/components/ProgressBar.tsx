import React, { useEffect, useState } from "react";

import type { ProgressBarProps } from "../utils/type-utils.ts";

const ProgressBar: React.FC<ProgressBarProps> = ({ timer }) => {
  const [remainingTime, setRemainingTime] = useState<number>(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress value={remainingTime} max={timer} />;
};

export default ProgressBar;
