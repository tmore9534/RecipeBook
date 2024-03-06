import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  //  @ViewChild('ingredientName') name: ElementRef; 
  //  @ViewChild('ingredientAmount') amount: ElementRef;
   shoppingEditForm:FormGroup;
   subscription:Subscription;
   editMode:boolean=false;
   editedItemIndex:number;
   editedItem:Ingredient;

   ngOnInit(){
    this.shoppingEditForm=new FormGroup({
      'ingredientName':new FormControl(null, Validators.required),
      'ingredientAmount':new FormControl(null, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$")])
    });
    
    this.subscription = this.shoppingListService.startEditing.subscribe((index:number)=>{
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem= this.shoppingListService.getIntgredient(index);

        this.shoppingEditForm.setValue({
          'ingredientName': this.editedItem.name,
          'ingredientAmount': this.editedItem.amount
        });
    });
   } 

   constructor(private shoppingListService:ShoppingListService){}
    
    onAdd(){
      const newIngredient=new Ingredient(this.shoppingEditForm.get('ingredientName').value,this.shoppingEditForm.get('ingredientAmount').value);

      if(this.editMode){
          this.shoppingListService.updateIngredients(this.editedItemIndex, newIngredient);
      }
      else{
          this.shoppingListService.addIngredient(newIngredient);
      }
      this.editMode = false;
      this.shoppingEditForm.reset();  
    }

    ngOnDestroy(){
      this.subscription.unsubscribe();
    }

    onClear(){
      this.shoppingEditForm.reset();
      this.editMode=false;
    }

    onItemDelete(){
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.shoppingEditForm.reset();
      this.editMode=false;  
    }
}
