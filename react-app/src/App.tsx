import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/app-layout.css";
import "./styles/theme.css";
import audio from "./assets/audio.wav";
import illustrationLight from "./assets/illustration-light.png";
import illustrationDark from "./assets/illustration-dark.png";
import { useEffect, useRef, useState } from "react";
import { type CountdownApi } from "react-countdown";
import Controls from "./components/Controls";
import Timer from "./components/Timer";
import ConfirmModal from "./components/ConfirmModal";
import IllustrationDisplay from "./components/IllustrationDisplay";
import FactDisplay from "./components/FactDisplay";
import SettingsModal from "./components/SettingsModal";

const App = () => {
  const startClass = "btn-success";
  const pauseClass = "btn-info";
  const restartClass = "btn-secondary";
  const restartDisabledClass = "btn-secondary disabled";
  const settingsClass = "btn-light";

  const startText = "Start";
  const pauseText = "Pause";
  const restartText = "Restart";

  const startIcon = "bi bi-caret-right";
  const pauseIcon = "bi bi-pause";
  const restartIcon = "bi bi-arrow-counterclockwise";
  const settingsIcon = "bi bi-gear";

  const [minutes, setMinutes] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const endpoint = Date.now() + minutes * 60000;
  const [timeLeft, setTimeLeft] = useState(endpoint);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [pendingDuration, setPendingDuration] = useState<number | null>(null);
  const [restartEnabled, setRestartEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [dark, setDark] = useState(false);

  const illustration = dark ? illustrationDark : illustrationLight;

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
    setTimeLeft(Date.now() + minutes * 60000);
    setShowConfirm(false);
  };

  const handleColorChange = (dark: boolean) => {
    setDark(dark);
  };

  return (
    <div className={dark ? "theme-dark" : "theme-light"}>
      <div className="app-root">
        {/* Settings Pop-up */}
        {showSettings && (
          <SettingsModal
            audioEnabled={audioEnabled}
            dark={dark}
            duration={minutes}
            onAudioChange={handleAudioChange}
            onCancel={() => setShowSettings(false)}
            onColorChange={handleColorChange}
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
        <div className="app-column">
          {/* White Overlay */}
          <div className="app-card">
            <div className="container py-5 app-content">
              {/* Title */}
              <h1 className="title display-4 fw-bold text-center mb-2">
                Pommi
              </h1>

              {/* Subtitle */}
              <p className="subtitle text-center">Time your study session!</p>

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
                  color={!isRunning ? startClass : pauseClass}
                  onClick={!isRunning ? handleStart : handlePause}
                >
                  <i className={!isRunning ? startIcon : pauseIcon} />
                  {!isRunning ? startText : pauseText}
                </Controls>

                {/* Restart Button */}
                <Controls
                  color={restartEnabled ? restartClass : restartDisabledClass}
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
                <Controls color={settingsClass} onClick={handleShowSettings}>
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
                <IllustrationDisplay illustration={illustration} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="app-footer">
            © {new Date().getFullYear()} Anastasiya Berst
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;

/** TO DO **/
// add in caching/settings memory
