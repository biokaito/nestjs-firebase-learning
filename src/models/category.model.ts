interface CategoryImage {
  id: string | number;
  thumbnail: string;
  original: string;
}

interface childrenCategory {
  id: string | number;
  name: string;
  slug: string;
}

export interface Category {
  id: string | number;
  name: string;
  slug: string;
  image: CategoryImage;
  icon: string;
  children?: childrenCategory[];
}
