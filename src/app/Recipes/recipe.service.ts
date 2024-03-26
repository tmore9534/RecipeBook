import {Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from 'src/shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()
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
  // recipes: Recipe[] =[];

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

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }

  setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes); 
  }

  updateRecipe(index:number, newRecipe:Recipe){
    this.recipes[index]=newRecipe;
    this.recipesChanged.next(this.recipes);

  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes);
  }
}
