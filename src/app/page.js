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
      <iframe src="https://vod-progressive.akamaized.net/exp=1708279085~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1952%2F15%2F384761655%2F1618226594.mp4~hmac=2a7772ad0ba4e5c752d13b7990fd206b09e6198236c6f9dc181759ae4cc5ac94/vimeo-prod-skyfire-std-us/01/1952/15/384761655/1618226594.mp4" />
    </div>
  );
}
