import React, { ReactNode, useEffect } from "react";

export const DarkModeWrapper = ({ mode, children }: { mode: string; children: ReactNode }) => {
  useEffect(() => {
    const html = document.documentElement;
    if (mode === 'dark') {
      html.classList.add('dark');
      html.style.colorScheme = 'dark';
    } else {
      html.classList.remove('dark');
      html.style.colorScheme = 'light';
    }
  }, [mode]);

  return <>{children}</>;
};