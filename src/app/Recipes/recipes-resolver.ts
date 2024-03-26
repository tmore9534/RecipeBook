import { Injectable, inject} from "@angular/core";
import { DataStoreService } from "src/shared/datastore.service";
import { Recipe } from "./recipe.model";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { RecipeService } from "./recipe.service";


export const addEditClietResolver: ResolveFn<Recipe[]> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      const recipes:Recipe[] = inject(RecipeService).getRecipes();
      if(recipes.length==0){
        return inject(DataStoreService).fetchData()
      }
      else{
        return recipes;
      }
};  
    
