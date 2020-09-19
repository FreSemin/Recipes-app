import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesDataService } from 'src/app/services/recipes-data/recipes-data.service';
import { RecipesService } from 'src/app/services/recipes/recipes.service';

@Component({
	selector: 'app-latest',
	templateUrl: './latest.component.html',
	styleUrls: ['./latest.component.scss']
})
export class LatestComponent implements OnInit, OnDestroy {

	constructor(public recipesService: RecipesService, public recipeDataService: RecipesDataService) { }

	public ngOnInit(): void {
		this.recipesService.loadLatest();
	}

	public ngOnDestroy(): void {
		this.recipesService.clearRecipesResults();
	}

}
