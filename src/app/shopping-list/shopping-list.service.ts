import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "src/shared/Ingredient.model";

@Injectable()
export class ShoppingListService{
    ingredients: Ingredient[]=[
    new Ingredient('apple',5),
    new Ingredient('Tomato',10),
  ]
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  getIntgdients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.emit(this.ingredients);
  }

  addIngredients(newIngredient:Ingredient[]){
    this.ingredients.push(...newIngredient)
  }
}