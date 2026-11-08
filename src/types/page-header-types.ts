import { BreadcrumbItem } from "./breadcrumb-types";

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItem[];
  action?: React.ReactNode;
  icon?: React.ReactNode;
}