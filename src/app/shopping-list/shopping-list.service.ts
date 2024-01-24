import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "src/shared/Ingredient.model";

@Injectable()
export class ShoppingListService{
    ingredients: Ingredient[]=[
    new Ingredient('apple',5),
    new Ingredient('Tomato',10),
  ]
  ingredientsChanged = new Subject<Ingredient[]>();

  getIntgdients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredients(newIngredient:Ingredient[]){
    this.ingredients.push(...newIngredient)
  }
}