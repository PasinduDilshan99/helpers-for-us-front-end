"use client";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import GlobalGradientScrollbar from "@/components/common-components/GlobalGradientScrollbar";
import ThemePicker from "@/components/common-components/ThemePicker";
import Footer from "@/components/common-components/static-components/Footer";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import NavBar from "../common-components/static-components/NavBar";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthCheck();

  return (
    <AuthProvider>
        <ThemeProvider>
          <GlobalGradientScrollbar />
          <ThemePicker />
          <NavBar />
          {children}
          <Footer />
        </ThemeProvider>
    </AuthProvider>
  );
}
