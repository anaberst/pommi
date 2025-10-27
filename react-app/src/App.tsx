import { useState } from "react";
import Controls from "./components/Controls";
import Timer from "./components/Timer";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  // "success" | "info" | "light" | "danger" | "secondary";
  // start | pause | restart | yes, I'm sure | go back

  const startColor = "success";
  const pauseColor = "info";
  const restartColor = "light";

  const startText = "Start";
  const pauseText = "Pause";
  const restartText = "Restart";

  const startIcon = "bi bi-caret-right";
  const pauseIcon = "bi bi-pause";
  const restartIcon = "bi bi-arrow-counterclockwise";

  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25);
  const [isRestartable, setIsRestartable] = useState(false);

  const handleStart = () => {
    setIsRunning(true);
    setTimeLeft(25);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleRestart = () => {
    setIsRunning(false);
    setTimeLeft(25);
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
        controlled={true}
        minutes={25}
        zeroPadTime={0}
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
