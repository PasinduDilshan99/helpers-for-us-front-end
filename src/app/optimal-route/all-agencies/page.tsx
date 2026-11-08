import ProtectedRoute from "@/components/ProtectedRoute";
import ViewAllAgenciesPage from "@/pages/optimal-route-management/ViewAllAgenciesPage";
import { VIEW_ALL_AGENCIES_PAGE_TITLE } from "@/utils/pagesHeaderTitles";
import { VIEW_ALL_AGENCIES_PRIVILEGE } from "@/utils/privileges";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: VIEW_ALL_AGENCIES_PAGE_TITLE,
};

const page = () => {
  return (
    <ProtectedRoute requiredPrivileges={[VIEW_ALL_AGENCIES_PRIVILEGE]}>
      <ViewAllAgenciesPage />
    </ProtectedRoute>
  );
};

export default page;
