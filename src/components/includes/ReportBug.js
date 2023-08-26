import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { serviceId, templateId, publicKey } from "./variables";
import swal from "sweetalert";

//icons
import Bug from "../../assets/svg-icons/Bug";
import Close from "../../assets/svg-icons/Close";

export default function ReportBug() {
  const form = useRef();
  const [showBugReport, setShowBugReport] = useState(false);
  const [showBug, setShowBug] = useState(true);

  const sendBugReport = (e) => {
    e.preventDefault();

    emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
      (result) => {
        console.log(result.text);
        e.target.reset();
      },
      (error) => {
        console.log(error.text);
      }
    );
    swal(
      "Thank you!",
      "Feedback is the breakfast for champions. (Ken Blanchard)",
      "success"
    );
    setShowBugReport(false);
    setShowBug(true);
  };

  useEffect(() => {
    if (showBugReport === true) {
      document.querySelector("#bugformCont").classList.add("slide-in-right");
    }
  }, [showBugReport]);

  const openForm = () => {
    if (showBugReport === false) {
      setShowBugReport(true);
      setShowBug(false);
    } else {
      setShowBugReport(false);
      setShowBug(true);
    }
  };

  return (
    <div className="report-container">
      {showBugReport && (
        <div className="bug-form-cont" id="bugformCont">
          <form ref={form} onSubmit={sendBugReport}>
            <div className="close-x" onClick={openForm}>
              <Close width={30} height={30} fill="white" />
            </div>

            <h6 className="bug-title">Found a bug?</h6>

            <h6 className="bug-title">Let me know about it!</h6>

            <label className="bug-label"></label>
            <textarea name="report" required minLength="5" />

            <button className="btn btn-info btn-sm bug-btn" type="submit">
              Send
            </button>
          </form>
        </div>
      )}

      <div className="report-bug-cont">
        {showBug && (
          <div className="bug-cont" onClick={openForm}>
            <Bug width={20} height={20} fill="white" />
          </div>
        )}
      </div>
    </div>
  );
}
