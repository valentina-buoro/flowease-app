import React, { useState, useEffect } from 'react';

const WallClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getRotation = (unit, max) => {
    return (unit / max) * 360;
  };

  const seconds = currentTime.getSeconds();
  const minutes = currentTime.getMinutes();
  const hours = currentTime.getHours();

  const secondHandRotation = getRotation(seconds, 60);
  const minuteHandRotation = getRotation(minutes, 60) + (seconds / 60) * 6; // Adding seconds for smooth transition
  const hourHandRotation = getRotation(hours % 12, 12) + (minutes / 60) * 30; // Adding minutes for smooth transition

  return (
    <div className="wall-clock relative w-48 h-48 lg:w-64 lg:h-64 bg-white border-4 border-gray-800 rounded-full flex items-center justify-center">
      <div className="clock-face absolute w-full h-full flex justify-center items-center">
        {/* Hour marks */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-6 bg-gray-800 "
            style={{ transform: `rotate(${i * 30}deg) translateY(-50%)` }}
          ></div>
        ))}
        {/* Numbers */}
        {[...Array(12)].map((_, i) => {
          const angle = i * 30;
          const radius = 90; // Adjust radius to position the numbers correctly
          const x = radius * Math.sin((angle * Math.PI) / 180);
          const y = -radius * Math.cos((angle * Math.PI) / 180);
          return (
            <div
              key={i}
              className="absolute text-gray-800 text-xl"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              {i === 0 ? 12 : i}
            </div>
          );
        })}
      </div>
      <div
        className="bg-[red] second-hand absolute bg-red-600 bottom-1/2 w-[2px] h-24 origin-bottom"
        style={{ transform: `rotate(${secondHandRotation}deg)` }}
      ></div>
      <div
        className="bg-[black] minute-hand absolute bg-gray-800 bottom-1/2 w-1 h-20 origin-bottom"
        style={{ transform: `rotate(${minuteHandRotation}deg)` }}
      ></div>
      <div
        className="bg-[black] hour-hand absolute bg-gray-800 bottom-1/2 w-2 h-12 origin-bottom"
        style={{ transform: `rotate(${hourHandRotation}deg)` }}
      ></div>
    </div>
  );
};

export default WallClock;
