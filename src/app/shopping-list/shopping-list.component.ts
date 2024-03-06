import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/shared/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients : Ingredient[];
  private idChangeSub : Subscription;
  constructor(private shoppingListService : ShoppingListService){}

  ngOnInit(){
    this.ingredients=this.shoppingListService.getIntgdients();
    
    this.idChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  ngOnDestroy(){
    this.idChangeSub.unsubscribe();
  }

  onEditItem(index:number){
    this.shoppingListService.startEditing.next(index);
  }
}
