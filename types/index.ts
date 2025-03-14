export interface ChildProps {
  children: React.ReactNode;
}

export interface BannerType {
  description_ru: string;
  description_uz: string;
  id: number;
  title_uz: string;
  title_ru: string;
  image: string;
}

export interface CatalogsType {
  id: number;
  image: string;
  name_uz: string;
  name_ru: string;
}
export interface CategoryType {
  description_ru: string;
  description_uz: string;
  id: number;
  name_uz: string;
  name_ru: string;
  type: string;
}

export interface DesktopType {
  id: number;
  fps: string;
  brand: {
    id: number;
    name: "HP";
  };
  category: CategoryType;
  cooler: string;
  description_ru: string;
  description_uz: string;
  image: string;
  memory: string;
  monitor: number;
  name_ru: string;
  name_uz: string;
  price_usd: string;
  price_uzs: string;
  processor: string;
  resolution: string;
  videocard: string;
}

export interface ProductsType {
  type: string;
  description_ru: string;
  description_uz: string;
  image: string;
  id: string;
  name_uz: string;
  name_ru: string;
  price_usd: string;
  price_uzs: string;
  slug: string;
}

export interface ServiceType {
  description_ru: string;
  description_uz: string;
  id: number;
  image: string;
  min_description_ru: string;
  min_description_uz: string;
  name_uz: string;
  name_ru: string;
}

export interface BlogTypes {
  created_time: Date;
  description_ru: string;
  description_uz: string;
  id: number;
  image: string;
  title_uz: string;
  title_ru: string;
}

export interface VideoType {
  id: number;
  image: string;
  name: string;
  profession_ru: string;
  profession_uz: string;
  review_uz: string;
  review_ru: string;
  youtube_url: string;
}
