import { Router, Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router';
import { RecipesComponent } from './Recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RecipesStartComponent } from './Recipes/recipes-start/recipes-start.component';
import { RecipeDetailComponent } from './Recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './Recipes/recipe-edit/recipe-edit.component';
import { addEditClietResolver } from './Recipes/recipes-resolver';
import { Recipe } from './Recipes/recipe.model';
import { AuthComponent } from './Auth/auth.component';
import {  AuthGuardService } from './Auth/auth-guard.service';


const appRoutes:Routes =[
    {path:'', redirectTo:'/recipes', pathMatch: "full" },

    { path:'recipes', component: RecipesComponent,
      canActivate:[AuthGuardService],
    children: [
        {path:'', component: RecipesStartComponent},
        {path:'new', component: RecipeEditComponent},
        {path:':id', component: RecipeDetailComponent, resolve:{addEditClietResolver}},
        {path:':id/edit', component: RecipeEditComponent, resolve:{addEditClietResolver}}
    ]},
    { path:'shopping-list', component: ShoppingListComponent },
    { path:'auth', component: AuthComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
    
}
