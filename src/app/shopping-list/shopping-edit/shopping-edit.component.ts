import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
   @ViewChild('ingredientName') name: ElementRef; 
   @ViewChild('ingredientAmount') amount: ElementRef;

   constructor(private shoppingListService:ShoppingListService){}
    
    onAdd(){
      const newIngredient=new Ingredient(this.name.nativeElement.value,this.amount.nativeElement.value);
      this.shoppingListService.addIngredient(newIngredient);
    }
}
