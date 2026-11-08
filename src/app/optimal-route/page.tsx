import ProtectedRoute from "@/components/ProtectedRoute";
import OptimalRouteManagementPage from "@/pages/optimal-route-management/OptimalRouteManagementPage";
import { OPTIMAL_ROUTE_MANAGEMENT_PAGE_TITLE } from "@/utils/pagesHeaderTitles";
import { OPTIMAL_ROUTE_MANAGEMENT_PRIVILEGE } from "@/utils/privileges";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: OPTIMAL_ROUTE_MANAGEMENT_PAGE_TITLE,
};

const page = () => {
  return (
    <ProtectedRoute requiredPrivileges={[OPTIMAL_ROUTE_MANAGEMENT_PRIVILEGE]}>
      <OptimalRouteManagementPage />
    </ProtectedRoute>
  );
};

export default page;
