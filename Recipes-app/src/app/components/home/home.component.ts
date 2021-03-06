import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes/recipes.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
	constructor(private _recipesService: RecipesService) { }

	public ngOnInit(): void {
		this._recipesService.clearRecipesResults();
		this._recipesService.initRecipesRandom();
	}

	public ngOnDestroy(): void {
		this._recipesService.clearRecipesResults();
	}
}
