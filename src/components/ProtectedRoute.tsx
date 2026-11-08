"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UNIQUE_CODE_NAME } from "@/utils/constant";
import { useAuth } from "@/contexts/AuthContext";
import CommonLoading from "@/components/common-components/CommonLoading";
import { ProtectedRouteProps } from "@/types/protected-route-types";
import { LOGIN_PAGE_URL, UNAUTHORIZED_PAGE_URL } from "@/utils/urls";

export default function ProtectedRoute({
  children,
  requiredPrivileges = [],
  unauthorizedRedirect = UNAUTHORIZED_PAGE_URL,
  showLoading = true,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { hasPrivilege, loading: authLoading } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      setIsChecking(true);

      const uniqueCode = sessionStorage.getItem(UNIQUE_CODE_NAME);
      if (!uniqueCode) {
        router.push(LOGIN_PAGE_URL);
        return;
      }

      if (requiredPrivileges.length > 0) {
        const hasAllPrivileges = requiredPrivileges.every((privilege) =>
          hasPrivilege(privilege),
        );

        if (!hasAllPrivileges) {
          router.push(unauthorizedRedirect);
          return;
        }
      }

      setHasAccess(true);
      setIsChecking(false);
    };

    if (!authLoading) {
      checkAccess();
    }
  }, [
    router,
    requiredPrivileges,
    unauthorizedRedirect,
    authLoading,
    hasPrivilege,
  ]);

  if (authLoading || isChecking) {
    if (showLoading) {
      return (
        <CommonLoading
          fullScreen
          size="md"
          message={
            requiredPrivileges.length > 0
              ? "Checking permissions..."
              : "Verifying access..."
          }
          subMessage="Please wait while we verify your credentials"
        />
      );
    }
    return null;
  }

  if (!hasAccess) return null;

  return <>{children}</>;
}
