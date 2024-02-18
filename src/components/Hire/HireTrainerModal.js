import { useState } from "react";
import styles from "./style.module.css";
import axios from "axios";

const author = {
  _id: 1,
  rate: 100,
};

function HireTrainerModal({ onClose }) {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(author);
  const [active, setActive] = useState(0);
  const [type, setType] = useState("author");
  const [durationType, serDurationType] = useState("hours");
  const [duration, setDuration] = useState(1);
  const [terms, setTerms] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const fetchTrainers = async () => {
    if (trainers.length) return;
    try {
      setLoading(true);
      const { data } = await axios.get("https://api.example.com/trainers");
      setTrainers(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to fetch trainers");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "trainer" && !selectedTrainer)
      return setError("Please select a trainer");
    if (!name) return setError("Name is required");
    if (!email) return setError("Email is required");
    if (!message) return setError("Message is required");
    if (!duration || duration < 1) return setError("Duration is required");
    if (!terms) return setError("Please accept terms and conditions");

    // Call API to submit the form
    const payload = {
      trainerId: selectedTrainer._id,
      name,
      email,
      message,
      duration,
      durationType,
    };

    console.log(payload);

    try {
      await axios.post("https://api.example.com/hire-trainer", payload);
      onClose();
      setError(null);
    } catch (error) {
      console.log(error);
      setError("Failed to submit the form");
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (type === "trainer" && !selectedTrainer)
      return setError("Please select a trainer");
    if (!name) return setError("Name is required");
    if (!email) return setError("Email is required");
    if (!message) return setError("Message is required");
    setActive(1);
    setError(null);
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={styles.close} onClick={onClose}>
          X
        </div>
        <h3>
          Hire a <span>Trainer</span>
        </h3>
        {error && <div className={styles.error}>{error}</div>}
        <fieldset className={active === 0 ? styles.active : ""}>
          <div className={styles.radioBtns}>
            <div>
              <input
                type="radio"
                id="author"
                name="trainer"
                value="author"
                defaultChecked
                onChange={() => {
                  setType("author");
                  setSelectedTrainer(author);
                }}
              />
              <label htmlFor="author">Hire original author</label>
            </div>
            <div>
              <input
                type="radio"
                id="trainer"
                name="trainer"
                value="trainer"
                onChange={() => {
                  setType("trainer");
                  setSelectedTrainer(null);
                  fetchTrainers();
                }}
              />
              <label htmlFor="trainer">Hire experience trainer</label>
            </div>
          </div>
          {type === "trainer" && (
            <div className={styles.formControl}>
              <label htmlFor="trainer">Select Trainer</label>
              <select
                id="trainer"
                onChange={(e) => {
                  setSelectedTrainer(
                    trainers.find((trainer) => trainer._id === e.target.value)
                  );
                }}
              >
                <option value="0">Select Trainer</option>
                {loading && <option value="0">Loading...</option>}
                {trainers.map((trainer) => (
                  <option key={trainer._id} value={trainer._id}>
                    {trainer.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className={styles.formControl}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.submit}>
            <button type="button" onClick={handleNext}>
              Proceed Next
            </button>
          </div>
        </fieldset>
        <fieldset className={active === 1 ? styles.active : ""}>
          <div className={styles.formControl}>
            <label>How many hours/days you need support for?</label>
            <div className={styles.time_type}>
              <div className={durationType == "hours" ? styles.active : ""}>
                <input
                  type="radio"
                  id="hours"
                  name="time"
                  value="hours"
                  defaultChecked
                  onChange={() => {
                    serDurationType("hours");
                  }}
                />
                <label htmlFor="hours">Hours</label>
              </div>
              <div className={durationType == "days" ? styles.active : ""}>
                <input
                  type="radio"
                  id="days"
                  name="time"
                  value="days"
                  onChange={() => {
                    serDurationType("days");
                  }}
                />
                <label htmlFor="days">Days</label>
              </div>
            </div>
            <input
              type="number"
              placeholder={`How many ${durationType} you need support for. Minimum 1 ${
                durationType === "hours" ? "hour" : "day"
              }`}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          {duration && (
            <div>
              You will be charged Rs.{" "}
              {durationType === "hours"
                ? author.rate * duration
                : author.rate * duration * 24}{" "}
              for {duration} {durationType}.
            </div>
          )}
          <div className={styles.terms}>
            <input
              type="checkbox"
              id="terms"
              onChange={(e) => {
                setTerms(e.target.checked);
              }}
              defaultChecked={terms}
            />
            <label htmlFor="terms">
              I agree to the terms and conditions and privacy policy.
            </label>
          </div>
          <div className={styles.submit}>
            <button
              type="button"
              onClick={() => {
                setActive(0);
              }}
            >
              Previous
            </button>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default HireTrainerModal;
