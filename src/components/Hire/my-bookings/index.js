import React, { useState } from "react";
import styles from "./my-bookings.module.css";
import { createPortal } from "react-dom";

const bookings = [
  {
    name: "John Doe",
    email: "test@mail.com",
    message: "I want to hire you for a project.",
    duration: "2",
    durationType: "days",
    createdAt: "2021-08-01T12:00:00Z",
    status: "pending",
  },
  {
    name: "John Doe",
    email: "test@mail.com",
    message: "I want to hire you for a project.",
    duration: "2",
    durationType: "days",
    createdAt: "2021-08-01T12:00:00Z",
    status: "pending",
  },
];

function MyBookings() {
  const [show, setShow] = useState(null);
  const [reason, setReason] = useState("");

  const handleReject = (e) => {
    e.preventDefault();
    console.log("Rejecting booking", show, reason);
  };

  const handleAccept = (e, i) => {
    e.preventDefault();
    console.log("Accepting booking", i);
  };
  return (
    <div className={styles.container}>
      {show != null &&
        createPortal(
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Reject Booking</h2>
              <p>Are you sure you want to reject this booking?</p>
              <select
                className="form-select"
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="">Select reason</option>
                <option value="Not Available">Not available</option>
                <option value="Spam">Spam</option>
                <option value="Inappropriate">Inappropriate</option>
                <option value="Other">Other</option>
              </select>
              <div className={styles.btns}>
                <button
                  className="btn btn-danger"
                  onClick={() => setShow(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleReject}>
                  Confirm
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      <div>
        <table className={styles.table}>
          <caption>My Bookings</caption>
          <thead>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, i) => (
              <tr key={i}>
                <td data-label="SN">{i + 1}</td>
                <td data-label="Name">{booking.name}</td>
                <td data-label="Email">
                  <a href={`mailto:${booking.email}`}>{booking.email}</a>
                </td>
                <td data-label="Message">{booking.message}</td>
                <td data-label="Duration">
                  {booking.duration + " " + booking.durationType}
                </td>
                <td data-label="Date">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </td>
                <td
                  data-label="Status"
                  className={
                    booking.status === "success"
                      ? styles.success
                      : booking.status === "failed"
                      ? styles.failed
                      : styles.pending
                  }
                >
                  {booking.status}
                </td>
                <td>
                  <div>
                    <button
                      className="btn btn-success"
                      onClick={(e) => handleAccept(e, i)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setShow(i)}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <h3 className="text-center">No bookings found</h3>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
