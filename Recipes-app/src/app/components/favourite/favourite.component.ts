import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesDataService } from 'src/app/services/recipes-data/recipes-data.service';

@Component({
	selector: 'app-favourite',
	templateUrl: './favourite.component.html',
	styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit, OnDestroy {

	constructor(public recipeDataService: RecipesDataService) { }

	public ngOnInit(): void {
		this.recipeDataService.initRecipeList();
	}

	public ngOnDestroy(): void {
		this.recipeDataService.destroyRecipeList();
	}

}
