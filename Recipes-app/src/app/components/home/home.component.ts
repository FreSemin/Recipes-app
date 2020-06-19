import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes/recipes.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
	constructor(private _recipesService: RecipesService) {}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {}

	public ngOnDestroy(): void {
		this._recipesService.recipeResults = [];
	}
}
