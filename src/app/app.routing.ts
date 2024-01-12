import { Router, Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './Recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RecipesStartComponent } from './Recipes/recipes-start/recipes-start.component';
import { RecipeDetailComponent } from './Recipes/recipe-detail/recipe-detail.component';


const appRoutes:Routes =[
    {path:'', redirectTo:'/recipes', pathMatch: "full" },
    { path:'recipes', component: RecipesComponent, children: [
        {path:'', component: RecipesStartComponent},
        {path:':id', component: RecipeDetailComponent}
    ]},
    { path:'shopping-list', component: ShoppingListComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
