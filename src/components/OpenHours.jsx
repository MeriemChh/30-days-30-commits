import React from "react";
import "../styles/OpenHours.css";
import { FaClock } from "react-icons/fa";
import { FaMugHot, FaStar, FaSun } from "react-icons/fa";

const OpenHours = () => {
  return (
    <section className="openhours">
      {/* Floating icons for that elegant motion effect */}
      <FaClock className="floating-icon clock-icon" />
      <FaMugHot className="floating-icon star-icon" />

      <div className="openhours-container">
        <div className="openhours-text">
          <h2>Opening Hours</h2>

          <div className="hours-list">
            <div className="hour-item">
              <span className="day">Monday – Thursday</span>
              <span className="time">08:00 AM – 10:00 PM</span>
            </div>
            <div className="hour-item">
              <span className="day">Friday</span>
              <span className="time">03:00 PM – 11:00 PM</span>
            </div>
            <div className="hour-item">
              <span className="day">Brunch</span>
              <span className="time">10:00 AM – 10:00 PM</span>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default OpenHours;
