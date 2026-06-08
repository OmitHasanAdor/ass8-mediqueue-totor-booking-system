"use client";
import { useTheme } from "next-themes";
import {Check, Power} from "@gravity-ui/icons";
import {Switch} from "@heroui/react";


const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div>
             <Switch onChange={()=>setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {({isSelected}) => (
        <>
          <Switch.Control
            className={`h-7.75 w-12.75 bg-blue-500 ${isSelected ? "bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]" : ""}`}
          >
            <Switch.Thumb
              className={`size-6.75 bg-white shadow-sm ${isSelected ? "ms-5.5 shadow-lg" : ""}`}
            >
              <Switch.Icon>
                {isSelected ? (
                  <Check className="size-4 text-cyan-600" />
                ) : (
                  <Power className="size-4 text-blue-600" />
                )}
              </Switch.Icon>
            </Switch.Thumb>
          </Switch.Control>
        </>
      )}
    </Switch>
        </div>
    );
};

export default ThemeSwitch;