import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { DataStoreService } from 'src/shared/datastore.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
    recipes:Recipe[];

    constructor(){}

    ngOnInit(){
      
    }


}
