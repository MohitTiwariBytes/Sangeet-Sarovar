import React from "react";
import "./Downloads.css";

const Downloads = () => {
  return (
    <div className="coming-soon">
      <h1>Coming Soon</h1>
      <p>Our downloads section is on its way. Stay tuned!</p>
      <button
        onClick={() => window.location.replace("/")}
        style={{ marginTop: "30px" }}
      >
        Back
      </button>
    </div>
  );
};

export default Downloads;
