"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UNIQUE_CODE_NAME } from "@/utils/constant";

export const useAuthCheck = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const uniqueCode = sessionStorage.getItem(UNIQUE_CODE_NAME);
    const isLoginPage = pathname === "/login";
    const isSignupPage = pathname === "/request-account";
    const isPublicPage = isLoginPage || isSignupPage;

    if (!uniqueCode && !isPublicPage) {
      router.push("/login");
    }
    
    // If user is already logged in and tries to access login/signup page,
    // redirect them to profile
    if (uniqueCode && isPublicPage) {
      router.push("/");
    }
  }, [pathname, router]);
};