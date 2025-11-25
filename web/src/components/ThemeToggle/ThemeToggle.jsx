import React from 'react'
import "./ThemeToggle.css"

function ThemeToggle({ darkMode, setDarkMode }) {
    const handleToggle = () => setDarkMode(!darkMode);

    return (
        <div className="toggle-switch">
            <label className="switch" style={{ marginBottom: 0 }}>
                <input type="checkbox" id="darkModeToggle" checked={darkMode} onChange={handleToggle} />
                <span className="slider round"></span>
            </label>
            <i className={`bi theme-icon ${darkMode ? "bi-moon-fill" : "bi-sun-fill"}`} />
        </div>
    )
}

export default ThemeToggle
