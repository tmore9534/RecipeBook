import { Component } from '@angular/core';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShoppingListService]
})
export class AppComponent {
  title = 'CoursePractice';
  loadedFeature = 'recipe';

  onNavigate(feature:string){
    this.loadedFeature=feature;
  }
}
