'use client'
import React from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';


const ThemeProvider = ({children} : {children: React.ReactNode}) => {
    return (
        <div>
            <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </NextThemeProvider>
           
        </div>
    );
};

export default ThemeProvider;