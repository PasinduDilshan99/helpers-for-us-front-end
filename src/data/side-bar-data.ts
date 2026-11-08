import { SideBarDataType } from "@/types/side-bar-types";
import * as PRIVILEGES from "@/utils/privileges";
import * as URLS from "@/utils/urls";

export const optimalRouteManagementSideBarData: SideBarDataType[] = [
  {
    id: 1,
    name: "Find Optimal Route",
    description: "Manage destination locations and related content",
    color: "#3B82F6",
    url: URLS.FIND_OPTIMAL_ROUTE_URL,
    privilege: PRIVILEGES.FIND_OPTIMAL_ROUTE_PRIVILEGE,
    subData: [],
  },
  {
    id: 2,
    name: "Add Agency",
    description: "Manage destination locations and related content",
    color: "#3B82F6",
    url: URLS.ADD_AGENCY_URL,
    privilege: PRIVILEGES.ADD_AGENCY_PRIVILEGE,
    subData: [],
  },
  {
    id: 3,
    name: "All Agencies",
    description: "Manage destination locations and related content",
    color: "#3B82F6",
    url: URLS.GET_ALL_AGENCIES_URL,
    privilege: PRIVILEGES.VIEW_ALL_AGENCIES_PRIVILEGE,
    subData: [],
  },
];
