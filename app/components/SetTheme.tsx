"use client";
import style from "./SetTheme.module.css";
import { useState, useEffect } from "react";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SetTheme = () => {
  // Initialize the theme state with the saved theme from localStorage or default to "light".
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  // Toggle the theme between "light" and "dark" when the button is clicked.
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Update the localStorage and the document's data-theme attribute whenever the theme state changes.
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Render the theme button with the appropriate icon based on the current theme.
  return (
    <>
      <button
        title={theme === "light" ? "Light Mode" : "Dark Mode"}
        onClick={toggleTheme}
        className={style.themeButton}
      >
        <FontAwesomeIcon icon={theme === "light" ? faSun : faMoon} />
      </button>
    </>
  );
};

export default SetTheme;
