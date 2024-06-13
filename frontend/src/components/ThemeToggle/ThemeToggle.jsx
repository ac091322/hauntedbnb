import { useState } from "react";
import { AiFillMoon, AiFillSun } from "react-icons/ai";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div
      id="theme-toggle-container"
      className={isToggled ? "toggled" : ""}
      onClick={() => setIsToggled(!isToggled)}
    >
      <div className={`thumb ${isToggled ? "slide-right" : "slide-left"}`}></div>
      <span
        id="moon-icon"
        className={`theme-icon-container ${isToggled ? "hide" : "show"}`}
      >
        <AiFillMoon className="theme-icon" />
      </span>
      <span
        id="sun-icon"
        className={`theme-icon-container ${isToggled ? "show" : "hide"}`}
      >
        <AiFillSun className="theme-icon" />
      </span>
    </div>
  );
};

export default ThemeToggle;
