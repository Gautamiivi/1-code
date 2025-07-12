import React, { createContext, useMemo, useState, useContext } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import getTheme from "./theme";

type Mode = "light" | "dark";

interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: Mode;
}

const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: "dark",
});

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<Mode>("dark"); // 🌙 Default dark mode

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* 👇 Pass mode as key so children re-render instantly on toggle */}
        <div key={mode}>{children}</div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
