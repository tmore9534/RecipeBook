import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesComponent } from './Recipes/recipes.component';
import { RecipeDetailComponent } from './Recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './Recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './Recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { AppRoutingModule } from './app.routing';
import { RecipesStartComponent } from './Recipes/recipes-start/recipes-start.component';
import { RecipeEditComponent } from './Recipes/recipe-edit/recipe-edit.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './Recipes/recipe.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipesStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [ShoppingListService,RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
