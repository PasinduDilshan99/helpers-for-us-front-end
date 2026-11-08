import ProtectedRoute from "@/components/ProtectedRoute";
import FindOptimalRoutePage from "@/pages/optimal-route-management/FindOptimalRoutePage";
import { FIND_OPTIMAL_ROUTE_PAGE_TITLE } from "@/utils/pagesHeaderTitles";
import { FIND_OPTIMAL_ROUTE_PRIVILEGE } from "@/utils/privileges";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: FIND_OPTIMAL_ROUTE_PAGE_TITLE,
};

const page = () => {
  return (
    <ProtectedRoute requiredPrivileges={[FIND_OPTIMAL_ROUTE_PRIVILEGE]}>
      <FindOptimalRoutePage />
    </ProtectedRoute>
  );
};

export default page;
