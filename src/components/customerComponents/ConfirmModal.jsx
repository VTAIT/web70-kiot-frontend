import React from "react";

function ConfirmModal({onConfirm}) {
  return (
    <div className="modal" tabindex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure that you want to edit this content?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onConfirm}>
              Yes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
