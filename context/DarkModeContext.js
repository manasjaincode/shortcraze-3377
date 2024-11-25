// import { createContext, useContext, useState } from "react";

// const DarkModeContext = createContext();

// export const DarkModeProvider = ({ children }) => {
//   const [theme, setTheme] = useState("light");

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

//   return (
//     <DarkModeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(DarkModeContext);
//   if (!context) {
//     throw new Error("useTheme must be used within a DarkModeProvider");
//   }
//   return context;
// };
