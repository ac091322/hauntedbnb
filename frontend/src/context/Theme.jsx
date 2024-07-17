import { useState, useEffect, createContext, useContext } from "react";


const ThemeContext = createContext();
export function useThemeContext() {
  return useContext(ThemeContext);
}

const ThemeProvider = (props) => {
  const storedTheme = localStorage.getItem("theme") || "dark"
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = {
    theme, setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};


export default ThemeProvider;
