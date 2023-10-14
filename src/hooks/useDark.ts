import { useState } from "react";

export const useDark = () => {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => {
    // get html tag and set class dark if isDark = true
    document.documentElement.classList.toggle("dark");
    // change isDark state
    localStorage.setItem("isDark", JSON.stringify(!isDark));
    // change isDark state in hook state
    setIsDark(!isDark);
  };
  return { isDark, toggleDark };
};
