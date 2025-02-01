"use client";
import { DarkModeProvider } from "./context/DarkModeContext";

export default function Providers({ children }) {
  return <DarkModeProvider>{children}</DarkModeProvider>;
}