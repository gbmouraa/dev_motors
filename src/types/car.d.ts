export interface CarImageProps {
  name: string;
  uid: string;
  previewUrl?: string;
  url?: string;
  file?: File;
}

export interface CarProps {
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
  created: any;
}
