import { Ingredient } from "src/shared/Ingredient.model";

export class Recipe{
  constructor(public name, public description, public imagePath, public ingredients: Ingredient[]){}
}   