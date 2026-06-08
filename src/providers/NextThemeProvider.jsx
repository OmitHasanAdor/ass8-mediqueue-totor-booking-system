"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const NextThemeProvider = ({ children }) => {
    return (
        <NextThemesProvider 
            attribute={["class", "data-theme"]}
            defaultTheme="light"
            value={{
                light: "light",
                dark: "dark"
            }}
        >
            {children}
        </NextThemesProvider>
    );
};

export default NextThemeProvider;