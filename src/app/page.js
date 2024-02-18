"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import HireTrainerModal from "../components/Hire/HireTrainerModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      {showModal &&
        createPortal(
          <HireTrainerModal onClose={() => setShowModal(false)} />,
          document.body
        )}
      <button onClick={() => setShowModal(true)}>Open Modal</button>
    </div>
  );
}
