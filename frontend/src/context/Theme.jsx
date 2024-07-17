import { useState, createContext, useContext } from "react";


const ThemeContext = createContext();
export function useThemeContext() {
  return useContext(ThemeContext);
}
