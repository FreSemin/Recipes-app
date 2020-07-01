import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesDataService } from 'src/app/services/recipes-data/recipes-data.service';

@Component({
	selector: 'app-latest',
	templateUrl: './latest.component.html',
	styleUrls: ['./latest.component.scss']
})
export class LatestComponent implements OnInit, OnDestroy {

	constructor(public recipeDataService: RecipesDataService) { }

	public ngOnInit(): void {
		this.recipeDataService.initLatestRecipeList();
	}

	public ngOnDestroy(): void {
		this.recipeDataService.destroyLatestRecipeList();
	}

}
