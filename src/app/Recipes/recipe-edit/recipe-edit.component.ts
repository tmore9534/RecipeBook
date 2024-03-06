import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupDirective, PatternValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { RecipeItemComponent } from '../recipe-list/recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
   id: number;
   editMode: boolean;
   recipeEditForm:FormGroup;
   
   constructor(private route:ActivatedRoute, private recipeService:RecipeService, private router:Router){}

   ngOnInit(){
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+ params['id'];
        this.editMode= params['id']!= null;
        this.initForm();
      }
    )
   }

  
   private initForm(){
      let recipeName="";
      let imagePath="";
      let description="";
      let recipeIngredient= new FormArray([]);  
      if(this.editMode){
        let recipe = this.recipeService.getRecipe(this.id);
        recipeName= recipe.name;
        imagePath = recipe.imagePath;
        description = recipe.description;
        if(recipe["ingredients"]){
          for(let ingredient of recipe.ingredients){
            recipeIngredient.push(new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
              'unit': ingredient.unit!="" ? new FormControl(ingredient.unit):new FormControl("")
            }));
          }
        }
      }
      
      this.recipeEditForm = new FormGroup ({
        "name": new FormControl(recipeName, Validators.required),
        "imagePath": new FormControl(imagePath, Validators.required),
        "description": new FormControl(description, Validators.required),
        'ingredients': recipeIngredient
      })  
   }

   get controls() { // a getter!
      return (<FormArray>this.recipeEditForm.get('ingredients')).controls;
  }

  get ingredientsArray(){
    return (<FormArray>this.recipeEditForm.get('ingredients'));
  }

  onAddNewIngredient(){
    (<FormArray>this.recipeEditForm.get('ingredients')).push(new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount':new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'unit': new FormControl()
    }));
  }

  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeEditForm.value);
    }
    else{
      this.recipeService.addRecipe(this.recipeEditForm.value);
    }
    this.router.navigate(['../'], {relativeTo:this.route});
  }

  onDeleteIngredients(i:number){
    this.ingredientsArray.removeAt(i);
  }



}
