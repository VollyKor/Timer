import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import getTimeString from './service/timeString';

function App() {
  const [time, setTime] = useState(0);
  const intervalId = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    intervalId.current = setInterval(() => {
      setTime(time + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId.current);
    };
  }, [isActive, time]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <div>
          <p>{getTimeString(time)}</p>
          <button
            onClick={() => {
              setIsActive(!isActive);
              setTime(0);
            }}
          >
            Start/Stop
          </button>
          <button>Wait</button>
          <button onClick={() => setTime(0)}>Reset</button>
        </div>
      </main>
    </div>
  );
}

export default App;
