import ProtectedRoute from "@/components/ProtectedRoute";
import AddAgencyPage from "@/pages/optimal-route-management/AddAgencyPage";
import { ADD_AGENCY_PAGE_TITLE } from "@/utils/pagesHeaderTitles";
import { ADD_AGENCY_PRIVILEGE } from "@/utils/privileges";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: ADD_AGENCY_PAGE_TITLE,
};

const page = () => {
  return (
    <ProtectedRoute requiredPrivileges={[ADD_AGENCY_PRIVILEGE]}>
      <AddAgencyPage />
    </ProtectedRoute>
  );
};

export default page;
