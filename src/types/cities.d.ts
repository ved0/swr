declare module "*.json" {
  const value: City[];
  export default value;
}

export interface City {
  id: number;
  name: string;
  imageUrl?: string;
  country: string;
  lat: string;
  lng: string;
  temp?: number;
  weather?: string;
}
