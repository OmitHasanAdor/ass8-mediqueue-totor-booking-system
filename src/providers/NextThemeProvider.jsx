"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const NextThemeProvider = ({ children }) => {
    return (
        <NextThemesProvider 
            attribute="class" // 🎯 অ্যারে বাদ দিয়ে শুধু "class" দাও
            defaultTheme="light"
            enableSystem={false} // সিস্টেম থিমের সাথে কনফ্লিক্ট এড়াতে এটা যুক্ত করতে পারো
        >
            {children}
        </NextThemesProvider>
    );
};

export default NextThemeProvider;