"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const NextThemeProvider = ({ children }) => {
    return (
        <NextThemesProvider 
            attribute="class" 
            defaultTheme="light"
            enableSystem={false} 
        >
            {children}
        </NextThemesProvider>
    );
};

export default NextThemeProvider;