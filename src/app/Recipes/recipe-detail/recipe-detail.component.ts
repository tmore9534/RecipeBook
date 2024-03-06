import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    recipe:Recipe;
    id:number;

    constructor(private recipeService:RecipeService, private router:Router, private routes:ActivatedRoute){}

    ngOnInit(){
      this.routes.params.subscribe(
        (params:Params)=>{
          this.id = +params['id'];
          this.recipe=this.recipeService.getRecipe(this.id);
        }
      )
    }

    onAddToShoppingList(recipe:Recipe){
      this.recipeService.addIngredientsToShoppingList(recipe.ingredients);
    }

    onDeleteRecipe(){
      this.recipeService.deleteRecipe(this.id);
      // this.router.navigate(['../'], {relativeTo:this.routes});
      this.router.navigate(['recipes']);
    }
  
    //alternative way to navigate to the edit page

    // onRecipeEdit(){
    //       this.router.navigate(['edit'], {relativeTo:this.routes});
    //   //  this.router.navigate(['../', this.id, 'edit'], {relativeTo:this.routes});
    // }
}
