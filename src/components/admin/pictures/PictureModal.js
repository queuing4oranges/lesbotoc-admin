import React from "react";
import Moment from "react-moment";

export default function PictureModal({ pic, setPicLoaded, picLoaded }) {
  return (
    <div className="pic-modal">
      {picLoaded && (
        <div className="pic-modal-content">
          <div className="pic-modal-body">
            <img
              className="pic-img"
              src={`https://api2.queuing4oranges.com/images/images/${pic.filename}`}
              alt={pic.alt}
            />
            <div className="pic-info">
              <p>
                <strong>ID: </strong>
                {pic.id}
              </p>
              <p>
                <strong>Title: </strong>
                {pic.title}
              </p>
              <p>
                <strong>Filename: </strong>
                {pic.filename}
              </p>
              <p>
                <strong>Alternate Text: </strong>
                {pic.alt}
              </p>
              <p>
                <strong>Uploaded: </strong>
                <Moment format="D. MMMM YYYY">{pic.created_at}</Moment>
              </p>
            </div>
          </div>
          <button
            className="btn btn-success btn-create btn-sm btn-img"
            onClick={() => setPicLoaded(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
