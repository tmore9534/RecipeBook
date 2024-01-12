import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from 'src/shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipes: Recipe[] = [
    new Recipe(
      'Chana Masala',
      'A very famous North indian dish',
      'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/08/chana-masala-recipe-500x500.jpg',
      [
        new Ingredient('kabuli chana', 2 , 'cups'),
        new Ingredient('Onion', 3),
        new Ingredient('Ginger Garlic', 1, 'each'),
        new Ingredient('chilies', 4)
      ]
    ),
    new Recipe(
      'Shahi Paneer',
      'Cheesy delights that melt your heart',
      'https://www.indianhealthyrecipes.com/wp-content/uploads/2018/11/shahi-paneer-recipe-500x500.jpg',
      [
        new Ingredient('Paneer', 100, 'gram'),
        new Ingredient('Onion', 2),
        new Ingredient('Ginger Garlic', 1, 'each'),
        new Ingredient('Cream', 20, 'gram')
      ]     
    ),
  ];
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService:ShoppingListService){}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index:number){
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}
