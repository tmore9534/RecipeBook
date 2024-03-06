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
  startEditing = new Subject<number>();


  getIntgdients(){
    return this.ingredients.slice();
  }

  getIntgredient(index:number){
    return this.ingredients[index];
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredients(newIngredient:Ingredient[]){
    this.ingredients.push(...newIngredient)
  }

  updateIngredients(index:number,updatedIngredient:Ingredient){   
    this.ingredients[index]=updatedIngredient;
    this.ingredientsChanged.next(this.ingredients);
  }

  deleteIngredient(index:number){ 
    console.log(this.ingredients," ", index);
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients)
  }
}