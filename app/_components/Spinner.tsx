import React from "react";

export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="spinner-body">
        <div className="front wheel"></div>
        <div className="back wheel"></div>
      </div>

      <div className="cover">
        <div className="path"></div>
      </div>

      <div className="text">Please wait...</div>
    </div>
  );
}
