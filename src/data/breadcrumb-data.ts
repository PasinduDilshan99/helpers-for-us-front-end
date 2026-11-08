import * as URLS from "@/utils/urls";

interface breadcrumbType {
  label: string;
  href: string;
}

export const FIND_OPTIMAL_ROUTE_BREADCRUMB_DATA: breadcrumbType[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Location Management",
    href: "/location-management",
  },
  {
    label: "Find Optimal Route",
    href: "/location-management/find-optimal-route", // adjust to your actual route
  },
];

export const ADD_AGENCY_BREADCRUMB_DATA: breadcrumbType[] = [
  { label: "Home", href: "/" },
  { label: "Location Management", href: "/location-management" },
  { label: "Add Agency", href: "/location-management/add-agency" },
];

export const VIEW_ALL_AGENCIES_BREADCRUMB_DATA: breadcrumbType[] = [
  { label: "Home", href: "/" },
  { label: "Location Management", href: "/location-management" },
  { label: "All Agencies", href: "/location-management/agencies" },
];