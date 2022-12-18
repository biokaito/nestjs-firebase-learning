import {IsNotEmpty, IsOptional} from 'class-validator';

class IProductImage {
  id: string | number;
  thumbnail: string;
  original: string;
}

class IProductGallery {
  id: string | number;
  thumbnail: string;
  original: string;
}

class IProductTag {
  id: string | number;
  name: string;
  slug: string;
}

class IAttributeValue {
  id: string | number;
  attribute_id: string | number;
  value: string;
}

class IVariationAttribute {
  id: string | number;
  slug: string;
  name: string;
  values: IAttributeValue[];
}

class IProductVariations {
  id: string | number;
  attribute_id: string | number;
  value: string;
  attribute: IVariationAttribute;
}

class IVariationOptionsOption {
  name: string;
  value: string;
}

class IProductVariationOptions {
  id: string | number;
  title: string;
  price: number;
  sale_price: number | null;
  quantity: number;
  is_disable: number;
  sku: number;
  options: IVariationOptionsOption[];
}

export class ProductDto {
  id: string | number;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  slug: string;
  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  description: string;
  image: IProductImage;
  isPublished: boolean;
  gallery: IProductGallery[];
  @IsNotEmpty()
  quantity: number;
  price?: number | null;
  sale_price?: number | null;
  @IsNotEmpty()
  unit: string;
  @IsNotEmpty()
  tag: IProductTag[];
  @IsOptional()
  product_type?: string;
  @IsOptional()
  createdAt?: Date;
  @IsOptional()
  max_price?: number;
  @IsOptional()
  min_price?: number;
  @IsOptional()
  variations?: IProductVariations[];
  @IsOptional()
  variation_options?: IProductVariationOptions[];
}
