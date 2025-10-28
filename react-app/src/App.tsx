import { useState } from "react";
import { useRef } from "react";
import { type CountdownApi } from "react-countdown";
import Controls from "./components/Controls";
import Timer from "./components/Timer";
import "bootstrap-icons/font/bootstrap-icons.css";

/** TO DO **/
// add audio upon completion, use onComplete callback
// add inspirationalText component
// add SettingsModal component with sliders for theme, audio, timer duration
// add in caching/settings memory?
// add in spacebar functionality to pause/resume?
// change start to "resume" when paused?

const App = () => {
  const startColor = "success";
  const pauseColor = "info";
  const restartColor = "light";
  // const confirmColor = "danger"; this triggers restart AND makes modal disappear
  // const undoColor = "secondary"; this simply makes the modal disappear

  const startText = "Start";
  const pauseText = "Pause";
  const restartText = "Restart";

  const startIcon = "bi bi-caret-right";
  const pauseIcon = "bi bi-pause";
  const restartIcon = "bi bi-arrow-counterclockwise";

  const minutes = 25;
  const endpoint = Date.now() + minutes * 60000;

  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(endpoint);

  const timerRef = useRef<CountdownApi | null>(null);

  const timerRenderer = ({
    minutes,
    seconds,
  }: {
    minutes: number;
    seconds: number;
  }) => {
    return (
      <>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </>
    );
  };

  const handleStart = () => {
    timerRef.current?.start();
    setIsRunning(true);
  };

  const handlePause = () => {
    timerRef.current?.pause();
    setIsRunning(false);
  };

  const handleRestart = () => {
    timerRef.current?.stop();
    setIsRunning(false);
    setTimeLeft(Date.now() + minutes * 60000);
  };

  return (
    <>
      <h2
        className="container d-flex justify-content-center align-items-center"
        style={{ color: "Grey", minHeight: "10vh" }}
      >
        Pomodoro Timer
      </h2>

      <Timer
        autoStart={false}
        className="d-flex justify-content-center timer-display"
        controlled={false}
        countdownRef={timerRef}
        date={timeLeft}
        renderer={timerRenderer}
      />

      <div className="d-flex justify-content-center gap-3">
        <Controls
          color={isRunning === false ? startColor : pauseColor}
          onClick={isRunning === false ? handleStart : handlePause}
        >
          <i className={isRunning === false ? startIcon : pauseIcon} />
          {isRunning === false ? startText : pauseText}
        </Controls>

        <Controls color={restartColor} onClick={handleRestart}>
          <i className={restartIcon}></i>
          {restartText}
        </Controls>
      </div>
    </>
  );
};

export default App;
