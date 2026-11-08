import ProtectedRoute from "@/components/ProtectedRoute";
import HomePage from "@/pages/HomePage";
import { HOME_PAGE_TITLE } from "@/utils/pagesHeaderTitles";
import { ADMIN_PORTAL_PRIVILEGE } from "@/utils/privileges";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: HOME_PAGE_TITLE,
};

export default function Home() {
  return (
    <ProtectedRoute requiredPrivileges={[ADMIN_PORTAL_PRIVILEGE]}>
      <HomePage />
    </ProtectedRoute>
  );
}
