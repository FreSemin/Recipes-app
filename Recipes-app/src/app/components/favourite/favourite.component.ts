import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesDataService } from 'src/app/services/recipes-data/recipes-data.service';
import { RecipesService } from 'src/app/services/recipes/recipes.service';

@Component({
	selector: 'app-favourite',
	templateUrl: './favourite.component.html',
	styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit, OnDestroy {

	constructor(public recipesService: RecipesService, public recipeDataService: RecipesDataService) { }

	public ngOnInit(): void {
		this.recipesService.loadFavorites();
	}

	public ngOnDestroy(): void {
		this.recipeDataService.destroyFavouriteRecipeList();
		this.recipesService.searchFavouriteStr = '';
		this.recipesService.isNothingFoundFavourite = false;
	}

}
