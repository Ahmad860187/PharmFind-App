/**
 * Mock Pharmacy Data
 * 
 * TODO (Backend): Delete this file when real API is implemented
 * This data is used by services when API_CONFIG.useMockData = true
 */

import { Pharmacy } from "@/types";

export const mockPharmacies: Pharmacy[] = [
  {
    id: 1,
    name: "El Ezaby Pharmacy",
    address: "123 Main St, Nasr City, Cairo",
    phone: "+20 2 1234 5678",
    rating: 4.5,
    distance: "0.8 km",
    deliveryTime: "20-30 min",
    deliveryFee: 15,
    isOpen: true,
    latitude: 30.0444,
    longitude: 31.2357,
    hours: {
      open: "08:00",
      close: "23:00",
    },
  },
  {
    id: 2,
    name: "Seif Pharmacy",
    address: "456 Tahrir Square, Downtown, Cairo",
    phone: "+20 2 2345 6789",
    rating: 4.3,
    distance: "1.2 km",
    deliveryTime: "25-35 min",
    deliveryFee: 20,
    isOpen: true,
    latitude: 30.0444,
    longitude: 31.2357,
    hours: {
      open: "09:00",
      close: "22:00",
    },
  },
  {
    id: 3,
    name: "19011 Pharmacy",
    address: "789 Heliopolis, Cairo",
    phone: "+20 2 3456 7890",
    rating: 4.7,
    distance: "2.5 km",
    deliveryTime: "30-40 min",
    deliveryFee: 25,
    isOpen: true,
    latitude: 30.0444,
    longitude: 31.2357,
    hours: {
      open: "00:00",
      close: "23:59",
    },
  },
  {
    id: 4,
    name: "Alfa Pharmacy",
    address: "321 Zamalek, Cairo",
    phone: "+20 2 4567 8901",
    rating: 4.2,
    distance: "3.0 km",
    deliveryTime: "35-45 min",
    deliveryFee: 30,
    isOpen: false,
    latitude: 30.0444,
    longitude: 31.2357,
    hours: {
      open: "08:00",
      close: "20:00",
    },
  },
];

// Pharmacy inventory mapping (which medicines are available at which pharmacy)
export const mockPharmacyInventory: Record<number, number[]> = {
  1: [1, 2, 3, 4, 5, 6], // El Ezaby has medicines 1-6
  2: [1, 3, 4, 7, 8],    // Seif has medicines 1, 3, 4, 7, 8
  3: [1, 2, 3, 4, 5, 6, 7, 8], // 19011 has all medicines
  4: [2, 3, 5, 6],       // Alfa has medicines 2, 3, 5, 6
};
