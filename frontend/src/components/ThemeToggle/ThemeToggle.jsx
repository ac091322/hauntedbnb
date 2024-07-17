import { AiFillMoon, AiFillSun } from "react-icons/ai";
import { useThemeContext } from "../../context/Theme";
import "./ThemeToggle.css";


const ThemeToggle = () => {
  const { theme, setTheme } = useThemeContext();
  const isToggled = theme === "light";

  const toggleTheme = () => {
    setTheme(isToggled ? "dark" : "light");
  };

  return (
    <div
      id="theme-toggle-container"
      className={isToggled ? "toggled" : ""}
      onClick={toggleTheme}
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
