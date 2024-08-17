import React, { useState, useRef } from 'react';

function Test() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Update every 10 milliseconds
      }, 10);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const recordLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Timer: {formatTime(time)} seconds</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={recordLap}>Lap</button>
      <button onClick={resetTimer}>Reset</button>
      <div>
        <h2>Laps:</h2>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>{formatTime(lap)} second</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Test;
