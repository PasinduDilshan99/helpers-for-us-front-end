"use client";
import Sidebar from "@/components/common-components/static-components/SideBar";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { optimalRouteManagementSideBarData } from "@/data/side-bar-data";

export default function BookingManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, isDarkMode } = useTheme();

  const getBackgroundColor = () => {
    if (isDarkMode) {
      return theme.background;
    }
    return "#F1F5F9";
  };

  return (
    <div
      className="transition-colors duration-300"
      style={{
        backgroundColor: getBackgroundColor(),
        minHeight: "100vh",
      }}
    >
      <div className="flex">
        <Sidebar
          data={optimalRouteManagementSideBarData}
          title="Booking Management"
          minWidth={260}
          maxWidth={600}
          defaultWidth={350}
        />
        <main className="flex-1 w-full lg:ml-0">
          <div className="">
            <div className="mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
