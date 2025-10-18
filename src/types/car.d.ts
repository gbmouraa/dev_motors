export interface CarImageProps {
  name: string;
  uid: string;
  previewUrl?: string;
  url?: string;
  file?: File;
  isNew?: boolean;
  toDelete?: boolean;
}

export interface CarProps {
  id?: string;
  name: string;
  model: string;
  year: string;
  km: string;
  phone: string;
  city: string;
  price: string;
  category: string;
  description: string;
  owner: string;
  uid: string;
  images: CarImageProps[];
  created?: any;
}

export interface CarItemProps {
  id: string;
  name: string;
  model: string;
  year: string;
  km: string;
  city: string;
  price: string;
  images: CarImageProps[];
  isOnDashboard?: boolean;
  onClick?: () => void;
  isOnFavoritePage?: boolean;
}
