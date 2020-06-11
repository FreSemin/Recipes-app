import { Component, OnInit, Input } from '@angular/core';
import {RecipesService} from '../../services/recipes/recipes.service';
import Recipe from './models/recipes';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  constructor(public recipesService: RecipesService) { }

  public ngOnInit(): void {
  }

}
