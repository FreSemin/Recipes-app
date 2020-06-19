import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../components/recipes/models/recipe/recipe';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipesDataService implements OnInit, OnDestroy {

	private static _recipeListKey: string = 'app-recipe-list';

	public favouriteRecipesList: Recipe[] = [];

	public favouriteRecipesListLS: Recipe[] = [];

	constructor() { }

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
	}

	public addToFavorite(recipe: Recipe): void {
		this.loadLSRecipes();
		this.favouriteRecipesListLS.push(recipe);
		this.saveLSRecipes();
	}

	public loadLSRecipes(): void {
		const recipesLS: string = localStorage.getItem(RecipesDataService._recipeListKey);
		if (Boolean(recipesLS)) {
			this.favouriteRecipesListLS = JSON.parse(localStorage.getItem(RecipesDataService._recipeListKey));
		} else {
			this.saveLSRecipes();
		}
	}

	public saveLSRecipes(): void {
		const recipesToSave: string = JSON.stringify(this.favouriteRecipesListLS);
		localStorage.setItem(RecipesDataService._recipeListKey, recipesToSave);
	}

	public initRecipeList(): void {
		this.loadLSRecipes();
		this.favouriteRecipesList = this.favouriteRecipesListLS;
	}

	public destroyRecipeList(): void {
		this.favouriteRecipesList = [];
	}

	public ngOnDestroy(): void {
		// this.favouriteRecipesList = [];
	}
}
