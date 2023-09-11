export interface Recipe {
  id: string;
  image_url: string;
  title: string;
  preparation_time: number;
  how_many_people: number;
  category: string;
  hash: string;
  ingredients: string[];
  ingredients_ref: number[];
  preparation_mode: string[];
  slug: string;
}
