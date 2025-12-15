interface Props {
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({ onCancel, onConfirm }: Props) => {
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
          <div className="modal-body">
            <p>This will reset the timer. Are you sure?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Yes, I'm sure
            </button>
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

export default ConfirmModal;
