/* React imports */
import { useEffect, useRef, useState } from "react";
import { type CountdownApi } from "react-countdown";

/* Bootstrap imports */
import "bootstrap-icons/font/bootstrap-icons.css";

/* App component imports */
import Controls from "./components/Controls";
import Timer from "./components/Timer";
import ConfirmModal from "./components/ConfirmModal";
import IllustrationDisplay from "./components/IllustrationDisplay";
import FactDisplay from "./components/FactDisplay";

const App = () => {
  /*** Microservice #2 Request via HTTP ***/
  const backgroundColor = "light-purple";
  const [hex, setHex] = useState("");
  useEffect(() => {
    async function loadColor() {
      const response = await fetch(
        `http://127.0.0.1:8001/color/${backgroundColor}`
      );
      let text = await response.text();
      text = text.replace(/"/g, "");
      setHex(text);
    }
    loadColor();
  }, []);

  /*** Microservice #3 Request via HTTP ***/
  const [ms, setMs] = useState<number | null>(null);
  useEffect(() => {
    async function convertTime() {
      const value = 25;
      const unit = "minutes";
      const desired = "milliseconds";
      const response = await fetch(
        `http://127.0.0.1:8002/time/${value}/${unit}/${desired}`
      );
      const text = await response.text();
      const milliseconds = Number(text); // convert to number
      setMs(milliseconds);
    }
    convertTime();
  }, []);

  const startColor = "btn-success";
  const pauseColor = "btn-info";
  const restartColor = "btn-light";
  const restartDisabledColor = "btn-light disabled";

  const startText = "Start";
  const pauseText = "Pause";
  const restartText = "Restart";

  const startIcon = "bi bi-caret-right";
  const pauseIcon = "bi bi-pause";
  const restartIcon = "bi bi-arrow-counterclockwise";

  const minutes = 25;
  const endpoint = Date.now() + minutes * 60000;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const convertedTime = ms;

  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(endpoint);
  const [showModal, setShowModal] = useState(false);
  const [restartEnabled, setRestartEnabled] = useState(false);

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
    setRestartEnabled(true);
  };

  const handlePause = () => {
    timerRef.current?.pause();
    setIsRunning(false);
    setRestartEnabled(true);
  };

  const handleConfirmModal = () => {
    setShowModal(true);
  };

  const handleCancelModal = () => {
    setShowModal(false);
  };

  const handleRestart = () => {
    setShowModal(false);
    timerRef.current?.stop();
    setIsRunning(false);
    setRestartEnabled(false);
    setTimeLeft(Date.now() + minutes * 60000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: hex,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      {/* Center column that holds overlay and footer */}
      <div
        style={{
          width: "100%",
          maxWidth: "650px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* White Overlay */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
            borderRadius: "24px",
            padding: "2.5rem",
            width: "100%",
            maxWidth: "625px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <div className="container py-5" style={{ maxWidth: "700px" }}>
            {/* Title */}
            <h1
              className="display-4 fw-bold text-center mb-2"
              style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: "80px",
                color: "#2f2c33ce",
                letterSpacing: "1.5px",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              Pommi
            </h1>

            {/* Subtitle */}
            <p className="text-center text-muted">
              Time your work or study session!
            </p>

            {/* Timer */}
            <div>
              <Timer
                autoStart={false}
                className="timer-display"
                controlled={false}
                countdownRef={timerRef}
                date={timeLeft}
                renderer={timerRenderer}
              />
            </div>

            {/* Controls */}
            <div className="d-flex justify-content-center gap-3 mb-5">
              <Controls
                color={isRunning === false ? startColor : pauseColor}
                onClick={isRunning === false ? handleStart : handlePause}
              >
                <i className={isRunning === false ? startIcon : pauseIcon} />
                {isRunning === false ? startText : pauseText}
              </Controls>

              <Controls
                color={
                  restartEnabled === true ? restartColor : restartDisabledColor
                }
                onClick={handleConfirmModal}
              >
                <i className={restartIcon}></i>
                {restartText}
              </Controls>
            </div>

            {/* Confirmation Pop-up */}
            {showModal && (
              <ConfirmModal
                onCancel={handleCancelModal}
                onConfirm={handleRestart}
              />
            )}

            {/* Study Illustration */}
            <div className="d-flex justify-content-center mb-4">
              <IllustrationDisplay theme={"study-space"} />
            </div>

            {/* Study Fact */}
            <FactDisplay theme={"study-habit"} />
          </div>
        </div>

        {/* Footer */}
        <footer
          style={{
            marginTop: "1.5rem",
            color: "#4a4458",
            fontSize: "0.9rem",
            opacity: 0.8,
          }}
        >
          © {new Date().getFullYear()} Anastasiya Berst
        </footer>
      </div>
    </div>
  );
};

export default App;

/** TO DO **/
// add audio upon completion, use onComplete callback
// add inspirationalText component
// add SettingsModal component with sliders for theme, audio, timer duration
// add in caching/settings memory?
// add in spacebar functionality to pause/resume?
// change start to "resume" when paused?
// add functionality to click out of modals
