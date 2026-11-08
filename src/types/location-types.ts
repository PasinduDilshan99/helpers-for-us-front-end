// types/location-types.ts

// ============ OPTIMAL DESTINATIONS ============

export interface OptimalDestinationsRequest {
  startLocation: number;
  endLocation: number;
  locations: number[];
  isSeeSister: boolean;
  isBarista: boolean;
}

export interface OptimalDestination {
  index: number;
  locationName: string;
  city: string;
  webSiteUrl: string | null;
  longitude: number;
  latitude: number;
}

export interface OptimalDestinationsApiResponse {
  code: number;
  status: string | null;
  message: string | null;
  data: OptimalDestination[];
  timestamp: string | null;
}

// ============ AGENCIES ============

export interface Agency {
  agencyId: number;
  name: string;
  city: string;
  webSiteUrl: string | null;
  latitude: number;
  longitude: number;
}

export interface AllAgenciesApiResponse {
  code: number;
  status: string | null;
  message: string | null;
  data: Agency[];
  timestamp: string | null;
}

export interface AddAgencyRequest {
  name: string;
  description: string;
  address: string;
  city: string;
  webSite: string;
  contactNumber: string;
  latitude: number;
  longitude: number;
}

export interface AddAgencyData {
  id: number;
  message: string;
}

export interface AddAgencyApiResponse {
  code: number;
  status: string | null;
  message: string | null;
  data: AddAgencyData;
  timestamp: string | null;
}
