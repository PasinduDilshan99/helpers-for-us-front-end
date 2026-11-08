// services/locationService.ts

import {
  OptimalDestinationsRequest,
  OptimalDestinationsApiResponse,
  AllAgenciesApiResponse,
  AddAgencyRequest,
  AddAgencyApiResponse,
} from "@/types/location-types";
import {
  ADD_AGENCY_FE,
  GET_ALL_AGENCY_FE,
  GET_OPTIMAL_ROUTE_BY_DESTINATIONS_FE,
} from "@/utils/frontEndConstant";

export class LocationService {
  // ============ GET APIs ============

  /**
   * Get optimal destinations for the given locations
   */
  static async getOptimalDestinations(
    request: OptimalDestinationsRequest,
  ): Promise<OptimalDestinationsApiResponse> {
    try {
      const response = await fetch(GET_OPTIMAL_ROUTE_BY_DESTINATIONS_FE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          startLocation: request.startLocation,
          endLocation: request.endLocation,
          locations: request.locations,
          isSeeSister: request.isSeeSister,
          isBarista: request.isBarista,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OptimalDestinationsApiResponse = await response.json();

      if (data.code !== 200) {
        throw new Error(data.message || "Failed to fetch optimal destinations");
      }

      return data;
    } catch (error) {
      console.error("Error fetching optimal destinations:", error);
      throw error;
    }
  }

  /**
   * Get all agencies
   */
  static async getAllAgencies(): Promise<AllAgenciesApiResponse> {
    try {
      const response = await fetch(GET_ALL_AGENCY_FE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AllAgenciesApiResponse = await response.json();

      if (data.code !== 200) {
        throw new Error(data.message || "Failed to fetch all agencies");
      }

      return data;
    } catch (error) {
      console.error("Error fetching all agencies:", error);
      throw error;
    }
  }

  // ============ CREATE APIs ============

  /**
   * Add a new agency
   */
  static async addAgency(
    agencyData: AddAgencyRequest,
  ): Promise<AddAgencyApiResponse> {
    try {
      const response = await fetch(ADD_AGENCY_FE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(agencyData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AddAgencyApiResponse = await response.json();

      if (data.code !== 200) {
        throw new Error(data.message || "Failed to add agency");
      }

      return data;
    } catch (error) {
      console.error("Error adding agency:", error);
      throw error;
    }
  }
}
