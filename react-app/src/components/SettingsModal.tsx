interface Props {
  onCancel: () => void;
}

const SettingsModal = ({ onCancel }: Props) => {
  return (
    <div
      className="modal show"
      tabIndex={-1}
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
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

          {/* Sound Setting */}
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckChecked"
              checked
            ></input>
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckChecked"
            >
              Alarm Sound
            </label>
          </div>

          {/* Duration Setting */}
          <div>Timer Duration</div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            ></input>
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              5
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked
            ></input>
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              25
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            ></input>
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              45
            </label>
          </div>

          {/* Theme Setting */}
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckChecked"
            ></input>
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckChecked"
            >
              Dark Mode
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
  );
};

export default SettingsModal;
