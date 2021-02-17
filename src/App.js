import logo from './logo.svg';
import './App.css';
import getTimeString from './service/timeString';
import btn from './service/btnStates';
import { useState, useEffect, useRef } from 'react';
import { debounceTime, buffer, filter } from 'rxjs/operators';
import { fromEvent, interval } from 'rxjs';

function App() {
  const [time, setTime] = useState(0);
  const [btnState, setBtnState] = useState(btn.stop);
  const button = useRef(null);

  useEffect(() => {
    if (btnState !== btn.start) return;

    const subscriber = interval(1000).subscribe(() => {
      setTime(time + 1);
    });

    return () => subscriber.unsubscribe();
  }, [btnState, time]);

  useEffect(() => {
    const clickStream = fromEvent(button.current, 'click');

    const subscriber = clickStream
      .pipe(
        buffer(clickStream.pipe(debounceTime(300))),
        filter(({ length }) => length === 2),
      )
      .subscribe(() => {
        btnState === btn.start
          ? setBtnState(btn.pause)
          : setBtnState(btn.start);
      });

    return () => {
      subscriber.unsubscribe();
    };
  }, [btnState]);

  const handleClickStart = () => {
    switch (btnState) {
      case btn.stop:
        setBtnState(btn.start);
        break;

      case btn.pause:
        setBtnState(btn.start);
        break;

      case btn.start:
        setBtnState(btn.stop);
        setTime(0);
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
          <p className="timer">{getTimeString(time)}</p>
          <button className="button" onClick={() => handleClickStart()}>
            Start/Stop
          </button>
          <button className="button" ref={button}>
            Wait
          </button>
          <button className="button" onClick={() => setTime(0)}>
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
