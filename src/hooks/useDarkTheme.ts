import React, { useState, useEffect } from "react"

export const useDarkTheme = (): [
  boolean,
  string,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true)

  const colorTheme = isDarkTheme === true ? "dark" : "light"

  useEffect(() => {
    const rootElement = window.document.documentElement
    rootElement.classList.remove(colorTheme)
    rootElement.classList.add(colorTheme)
    localStorage.setItem("theme", colorTheme)
  }, [isDarkTheme, colorTheme])
  return [isDarkTheme,colorTheme, setIsDarkTheme]
}
