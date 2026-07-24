export interface CreateAddressBody {
  fullName: string;
  phone: string;

  houseNo: string;
  area: string;
  landmark?: string;

  city: string;
  state: string;
  pincode: string;

  latitude?: number;
  longitude?: number;

  addressType: "HOME" | "WORK" | "OTHER";
}

export interface UpdateAddressBody {
  fullName?: string;
  phone?: string;

  houseNo?: string;
  area?: string;
  landmark?: string;

  city?: string;
  state?: string;
  pincode?: string;

  latitude?: number;
  longitude?: number;

  addressType?: "HOME" | "WORK" | "OTHER";
}

export interface AddressParams {
  id: string;
}