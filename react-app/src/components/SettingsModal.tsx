interface Props {
  audioEnabled: boolean;
  dark: boolean;
  duration: number;
  onAudioChange: (enabled: boolean) => void;
  onCancel: () => void;
  onColorChange: (dark: boolean) => void;
  onDurationRequest: (minutes: number) => void;
}

const SettingsModal = ({
  audioEnabled,
  dark,
  duration,
  onAudioChange,
  onCancel,
  onColorChange,
  onDurationRequest,
}: Props) => {
  return (
    <div className="modal show" tabIndex={-1} style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Settings</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onCancel}
            ></button>
          </div>

          <div className="modal-body px-4">
            {/* Sound */}
            <div className="form-check form-switch  mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                checked={audioEnabled}
                onChange={(e) => {
                  onAudioChange(e.target.checked);
                }}
              />
              <label className="form-check-label" htmlFor="audioSwitch">
                Alarm Sound
              </label>
            </div>

            {/* Duration */}
            <div className="mb-4">
              <div className="fw-semibold mb-2">Timer Duration</div>
              {[5, 25, 45].map((value) => (
                <div className="form-check" key={value}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="duration"
                    id={`duration-${value}`}
                    value={value}
                    checked={duration === value}
                    onChange={(e) => {
                      onDurationRequest(Number(e.target.value));
                    }}
                  ></input>
                  <label
                    className="form-check-label"
                    htmlFor={`duration-${value}`}
                  >
                    {value} minutes
                  </label>
                </div>
              ))}
            </div>

            {/* Theme */}
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="themeSwitch"
                checked={dark}
                onChange={(e) => {
                  onColorChange(e.target.checked);
                }}
              />
              <label className="form-check-label" htmlFor="themeSwitch">
                Dark mode
              </label>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onCancel}
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
