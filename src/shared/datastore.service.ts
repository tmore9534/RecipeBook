import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "src/app/Auth/auth.service";
import { Recipe } from "src/app/Recipes/recipe.model";
import { RecipeService } from "src/app/Recipes/recipe.service";

@Injectable({providedIn:'root'})
export class DataStoreService {
    constructor(private http:HttpClient, private recipeService:RecipeService, private authService:AuthService){}

    saveData(){
        const recipes= this.recipeService.getRecipes();
        this.http.put('https://recipebook-9f0b5-default-rtdb.firebaseio.com/recipe.json', recipes).subscribe(response => {
            console.log(response)
        });
    }

    fetchData(){
        return this.http.get<Recipe[]>('https://recipebook-9f0b5-default-rtdb.firebaseio.com/recipe.json')
        .pipe( 
            map(recipes=>{
                return recipes.map(recipe => {
                return {...recipe, ingredients:recipe.ingredients ? recipe.ingredients : []}; 
            });
        }),
            tap(recipes=>{
                this.recipeService.setRecipes(recipes);
        })) 
    }
}       