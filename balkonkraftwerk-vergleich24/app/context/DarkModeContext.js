// DarkModeContext.js
"use client";

import React, { createContext, useState, useEffect } from "react";

export const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Lade Einstellung aus LocalStorage beim ersten Rendern
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
  }, []);

  // Aktualisiere document.body, damit der Hintergrund global wechselt
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#121212" : "#F0F8FF";
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};