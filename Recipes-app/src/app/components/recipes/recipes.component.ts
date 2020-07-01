import { Component, OnInit, Input } from '@angular/core';
import { RecipesService } from '../../services/recipes/recipes.service';
import { RecipesDataService } from '../../services/recipes-data/recipes-data.service';
import Recipe from './models/recipe/recipe';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

	constructor(public recipesService: RecipesService, public recipesDataService: RecipesDataService) { }

	public ngOnInit(): void {
		this.recipesService.checkForRecipeWithDetails();
		this.recipesService.checkForFavouriteRecipes();
	}

}
