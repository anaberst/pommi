import { useEffect, useRef, useState } from "react";
import { type CountdownApi } from "react-countdown";
import "bootstrap-icons/font/bootstrap-icons.css";
import Controls from "./components/Controls";
import Timer from "./components/Timer";
import ConfirmModal from "./components/ConfirmModal";
import IllustrationDisplay from "./components/IllustrationDisplay";
import FactDisplay from "./components/FactDisplay";
import SettingsModal from "./components/SettingsModal";

const App = () => {
  const startColor = "btn-success";
  const pauseColor = "btn-info";
  const restartColor = "btn-secondary";
  const restartDisabledColor = "btn-secondary disabled";
  const settingsColor = "btn-light";

  const startText = "Start";
  const pauseText = "Pause";
  const restartText = "Restart";

  const startIcon = "bi bi-caret-right";
  const pauseIcon = "bi bi-pause";
  const restartIcon = "bi bi-arrow-counterclockwise";
  const settingsIcon = "bi bi-gear";

  const audio = "./audio.wav";

  const [minutes, setMinutes] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const endpoint = Date.now() + minutes * 60000;
  const [timeLeft, setTimeLeft] = useState(endpoint);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [pendingDuration, setPendingDuration] = useState<number | null>(null);
  const [restartEnabled, setRestartEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

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

  useEffect(() => {
    timerRef.current?.stop();
    setIsRunning(false);
    setRestartEnabled(false);
    setTimeLeft(Date.now() + minutes * 60000);
  }, [minutes]);

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

  const handleRestart = () => {
    // if confirmation pop-up is active
    if (showConfirm) {
      setShowConfirm(false);
    }
    timerRef.current?.stop();
    setIsRunning(false);
    setRestartEnabled(false);
    setTimeLeft(Date.now() + minutes * 60000);
  };

  const handleComplete = () => {
    setIsRunning(false);
    setTimeLeft(0);

    if (audioEnabled) {
      new Audio(audio).play();
    }
  };

  const handleConfirmModal = () => {
    setShowConfirm(true);
  };

  const handleCancelConfirm = () => {
    setPendingDuration(null);
    setShowConfirm(false);
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  const handleAudioChange = (audioEnabled: boolean) => {
    setAudioEnabled(audioEnabled);
  };

  const handleDurationRequest = (newMinutes: number) => {
    if (isRunning || timeLeft > 0) {
      setPendingDuration(newMinutes);
      setShowConfirm(true);
    } else {
      applyDurationChange(newMinutes);
    }
  };

  const applyDurationChange = (newMinutes: number) => {
    setMinutes(newMinutes);
    setTimeLeft(Date.now() + newMinutes * 60000);
  };

  const handleConfirmDuration = () => {
    if (pendingDuration !== null) {
      applyDurationChange(pendingDuration);
    }
    setPendingDuration(null);
    setShowConfirm(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#F2E9FF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      {/* Settings Pop-up */}
      {showSettings && (
        <SettingsModal
          audioEnabled={audioEnabled}
          duration={minutes}
          onAudioChange={handleAudioChange}
          onCancel={() => setShowSettings(false)}
          onDurationRequest={handleDurationRequest}
        />
      )}

      {/* Confirmation Pop-up */}
      {showConfirm && (
        <ConfirmModal
          onCancel={handleCancelConfirm}
          onConfirm={handleConfirmDuration}
        />
      )}

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
            <p className="text-center text-muted">Time your study session!</p>

            {/* Timer */}
            <div>
              <Timer
                autoStart={false}
                className="timer-display"
                controlled={false}
                countdownRef={timerRef}
                date={timeLeft}
                renderer={timerRenderer}
                onComplete={handleComplete}
              />
            </div>

            <div className="d-flex justify-content-center gap-3 mb-5">
              {/* Start & Pause Button */}
              <Controls
                color={!isRunning ? startColor : pauseColor}
                onClick={!isRunning ? handleStart : handlePause}
              >
                <i className={!isRunning ? startIcon : pauseIcon} />
                {!isRunning ? startText : pauseText}
              </Controls>

              {/* Restart Button */}
              <Controls
                color={restartEnabled ? restartColor : restartDisabledColor}
                onClick={() => {
                  // only prompts confirmation pop-up for unfinished timer
                  if (timeLeft > 0) {
                    handleConfirmModal();
                  } else {
                    handleRestart();
                  }
                }}
              >
                <i className={restartIcon}></i>
                {restartText}
              </Controls>

              {/* Settings Button */}
              <Controls color={settingsColor} onClick={handleShowSettings}>
                <i className={settingsIcon}></i>
              </Controls>
            </div>

            {/* Fact */}
            <FactDisplay
              fact={
                "Short breaks during study sessions can help improve focus and prevent burnout."
              }
            />

            {/* Illustration */}
            <div className="d-flex justify-content-center mb-1">
              <IllustrationDisplay illustration={"./illustration-light.png"} />
            </div>
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
// light/dark theme
// add in caching/settings memory
