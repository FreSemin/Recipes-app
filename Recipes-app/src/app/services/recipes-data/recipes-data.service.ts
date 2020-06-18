import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../components/recipes/models/recipe/recipe';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipesDataService implements OnInit, OnDestroy {
	public favouriteResipesList: Recipe[] = [];

	constructor() {}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
		// console.log('init');
		// console.log(this.favouriteResipesList);
	}

	public loadLSRecipes(): void {
		// console.log(this.favouriteResipesList);
	}

	public ngOnDestroy(): void {
		
	}
}
