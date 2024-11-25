import { createContext, useContext, useState } from "react";

// Create the ThemeContext
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Theme state (light by default)
  const [theme, setTheme] = useState("light");

  // Method to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easier usage of ThemeContext
export const useTheme = () => useContext(ThemeContext);
