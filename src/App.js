import logo from './logo.svg';
import './App.css';
import getTimeString from './service/timeString';
import btn from './service/btnStates';
import { useState, useEffect, useRef } from 'react';
import { debounceTime, buffer, filter } from 'rxjs/operators';
import { fromEvent, interval } from 'rxjs';

function App() {
  const [timerTime, setTimerTime] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const [btnState, setBtnState] = useState(btn.stop);
  const button = useRef(null);

  useEffect(() => {
    const subscriber = interval(100).subscribe(() => {
      if (btnState === btn.stop) {
      }
      if (btnState === btn.start) {
        setTimerTime(Date.now() - startTime);
      }

      if (btnState === btn.pause) {
      }
    });

    return () => subscriber.unsubscribe();
  }, [btnState, startTime]);

  useEffect(() => {
    const clickStream = fromEvent(button.current, 'click');

    const subscriber = clickStream
      .pipe(
        buffer(clickStream.pipe(debounceTime(300))),
        filter(({ length }) => length === 2),
      )
      .subscribe(() => {
        if (btnState === btn.start) {
          setBtnState(btn.pause);
        }
        if (btnState === btn.pause) {
          setTimerTime(Date.now() - (timerTime + startTime));
          setBtnState(btn.start);
          setBtnState(btn.start);
        }
      });

    return () => {
      subscriber.unsubscribe();
    };
  }, [btnState, startTime]);

  const handleClickStart = () => {
    switch (btnState) {
      case btn.stop:
        setStartTime(Date.now() + timerTime);
        setBtnState(btn.start);
        break;

      case btn.pause:
        // const deltaTime = Date.now() - startTime - timerTime;
        setTimerTime(Date.now() - (timerTime + startTime));
        setBtnState(btn.start);
        break;

      case btn.start:
        setTimerTime(timerTime);
        setBtnState(btn.stop);
        break;

      default:
        console.log('error');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <div className="wrapper">
          <h1 className="title">Stopwatch</h1>
          <p className="timer">{getTimeString(timerTime)}</p>
          <button className="button" onClick={() => handleClickStart()}>
            Start/Stop
          </button>
          <button className="button" ref={button}>
            Wait
          </button>
          <button
            className="button"
            onClick={() => {
              setTimerTime(0);
              setStartTime(Date.now());
            }}
          >
            Reset
          </button>
        </div>
      </main>
      <footer className="footterWrapper">
        <a className="githubLink" href="https://github.com/VollyKor">
          GitHub Link
        </a>
      </footer>
    </div>
  );
}

export default App;
