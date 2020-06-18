import { Component, OnInit } from '@angular/core';
import { RecipesDataService } from 'src/app/services/recipes-data/recipes-data.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  constructor(public recipeDataService: RecipesDataService) { }

  public ngOnInit(): void {
    this.recipeDataService.f();
  }

}
