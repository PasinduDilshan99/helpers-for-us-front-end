import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";
import { Metadata } from "next";
import { MAIN_PAGE_PAGE_TITLE } from "@/utils/pagesHeaderTitles";

export const metadata: Metadata = {
  title: {
    default: MAIN_PAGE_PAGE_TITLE,
    template: "%s | Felicita Trips",
  },
  description: "Travel Agency in sri lanka",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
