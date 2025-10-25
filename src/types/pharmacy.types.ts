export interface Pharmacy {
  id: number;
  name: string;
  address: string;
  phone: string;
  rating: number;
  distance: string;
  deliveryTime: string;
  deliveryFee: number;
  isOpen: boolean;
  latitude?: number;
  longitude?: number;
  hours?: {
    open: string;
    close: string;
  };
}

export interface PharmacyWithInventory extends Pharmacy {
  availableMedicines: number[];
}
