import { HomeCardType } from "@/types/home-page-data-types";
import { OPTIMAL_ROUTE_MANAGEMENT_PRIVILEGE } from "@/utils/privileges";
import { OPTIMAL_ROUTE_MANAGEMENT } from "@/utils/urls";

export const homeCardData: HomeCardType[] = [
  {
    id: 1,
    name: "Optimal Route Management",
    label: "Content",
    description:
      "Manage destinations, tours, activities, packages, schedules, and seasonal content.",
    color: "#6366F1",
    hoverColor: "#4F46E5",
    bgColor: "bg-indigo-50",
    linkTo: OPTIMAL_ROUTE_MANAGEMENT,
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1006/1006363.png",
    privilege: OPTIMAL_ROUTE_MANAGEMENT_PRIVILEGE,
  },
];
