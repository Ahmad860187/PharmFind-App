/**
 * Pharmacies Service
 * 
 * TODO (Backend): Replace mock implementations with real API calls
 */

import { Pharmacy } from "@/types";
import { API_CONFIG } from "./api/config";
import { apiClient } from "./api/client";
import { mockPharmacies } from "@/data/mock/pharmacies.mock";

export class PharmaciesService {
  /**
   * Search pharmacies by location
   * TODO (Backend): Implement GET /api/pharmacies?lat={lat}&lng={lng}&radius={radius}
   */
  static async searchPharmacies(
    latitude?: number,
    longitude?: number,
    radius?: number
  ): Promise<Pharmacy[]> {
    if (API_CONFIG.useMockData) {
      // Return all mock pharmacies (in production, would filter by distance)
      return mockPharmacies;
    }

    return apiClient.get<Pharmacy[]>(`/pharmacies`, {
      lat: latitude,
      lng: longitude,
      radius,
    });
  }

  /**
   * Get pharmacy by ID
   * TODO (Backend): Implement GET /api/pharmacies/{id}
   */
  static async getPharmacyById(id: number): Promise<Pharmacy | undefined> {
    if (API_CONFIG.useMockData) {
      return mockPharmacies.find((p) => p.id === id);
    }

    return apiClient.get<Pharmacy>(`/pharmacies/${id}`);
  }

  /**
   * Get pharmacies that have a specific medicine in stock
   * TODO (Backend): Implement GET /api/medicines/{medicineId}/pharmacies
   */
  static async getPharmaciesWithMedicine(medicineId: number): Promise<Pharmacy[]> {
    if (API_CONFIG.useMockData) {
      const { mockPharmacyInventory } = await import("@/data/mock/pharmacies.mock");
      
      const pharmacyIds = Object.entries(mockPharmacyInventory)
        .filter(([_, medicineIds]) => medicineIds.includes(medicineId))
        .map(([pharmacyId]) => parseInt(pharmacyId));

      return mockPharmacies.filter((p) => pharmacyIds.includes(p.id));
    }

    return apiClient.get<Pharmacy[]>(`/medicines/${medicineId}/pharmacies`);
  }
}
