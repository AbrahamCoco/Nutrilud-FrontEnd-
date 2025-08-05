import { useEffect, useState } from "react";

export default function Clock({ className }: { className: string }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: Date) => {
    const hours = time.getHours() % 12 || 12;
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

    return (
      <>
        <span className="hours">{hours}</span>
        <span className="separator">:</span>
        <span className="minutes">{minutes}</span>
        <span className="separator">:</span>
        <span className="seconds">{seconds}</span>
        <span className="ampm ml-2">{ampm}</span>
      </>
    );
  };

  return (
    <div className={`flex items-center justify-center font-mono ${className}`}>
      <div className="bg-gray-100 rounded-lg p-3 shadow-inner">
        <div className="text-2xl font-bold text-gray-800 tracking-wider">
          {formatTime(currentTime)}
        </div>
      </div>
    </div>
  );
}