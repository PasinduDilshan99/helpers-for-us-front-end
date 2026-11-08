export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPrivileges?: string[];
  unauthorizedRedirect?: string;
  showLoading?: boolean;
}