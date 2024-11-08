import { useEffect, useState } from "react";

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const hours = time.getHours() % 12 || 12;
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");
    const ampm = time.getHours() >= 12 ? "PM" : "AM";

    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };

  return <div>{formatTime(currentTime)}</div>;
}
