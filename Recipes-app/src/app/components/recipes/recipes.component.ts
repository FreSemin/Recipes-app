import { Component, OnInit, Input } from '@angular/core';
import { RecipesService } from '../../services/recipes/recipes.service';
import Recipe from './models/recipe/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  constructor(public recipesService: RecipesService) { }

  // tslint:disable-next-line: no-empty
  public ngOnInit(): void {
  }

}
