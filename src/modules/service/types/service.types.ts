export interface Category {
  id: string;
  name: string;
}

export interface Package {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  isRecommended: boolean;
  isActive: boolean;
}

export interface Service {
  id: string;
  categoryId: string;
  category: Category;

  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;

  image?: string;
  bannerImage?: string;

  basePrice: number;
  duration: number;

  isActive: boolean;

  packages: Package[];

  createdAt: string;
  updatedAt: string;
}

export interface ServiceResponse {
  success: boolean;
  message: string;
  data: Service[];
}

export interface SingleServiceResponse {
  success: boolean;
  message: string;
  data: Service;
}