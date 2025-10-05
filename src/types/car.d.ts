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
  // id do documento no firebase
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

// EditCarProps -> Omit
