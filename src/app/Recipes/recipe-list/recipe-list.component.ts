import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStoreService } from 'src/shared/datastore.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes:Recipe[];
  recipesSubscription:Subscription;
  
  constructor(private recipeService:RecipeService, private router:Router, private route:ActivatedRoute, private dataStroreService:DataStoreService){}

  ngOnInit(){
    
     this.recipesSubscription = this.recipeService.recipesChanged.subscribe((newRecipes:Recipe[])=>{ 
      this.recipes = newRecipes;
    });

    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo:this.route})
  }

  ngOnDestroy(){
      this.recipesSubscription.unsubscribe();
  }
  
}
