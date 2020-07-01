import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../components/recipes/models/recipe/recipe';
import { HttpClient } from '@angular/common/http';
import CuisinesSelect from 'src/app/models/cuisines-select/cuisines-select';
import Cuisine from 'src/app/models/cuisines/cuisines';
import { Router } from '@angular/router';

@Injectable()
export class RecipesDataService implements OnInit, OnDestroy {

	private static _recipeListKey: string = 'app-recipe-list';
	private _baseAssetsUrl: string = 'assets';

	public selectCuisinesValues: CuisinesSelect = {
		cuisinesInclude: [new Cuisine('', false)],
		cuisinesExclude: [new Cuisine('', false)],
		cuisinesValuesStrings: [''],
	};

	public cuisinesValuesInclude: Cuisine[] = [new Cuisine('', false)];
	public cuisinesValuesExclude: Cuisine[] = [new Cuisine('', false)];

	public favouriteRecipesList: Recipe[] = [];

	public favouriteRecipesListLS: Recipe[] = [];

	public allIncludeComplete: boolean = false;
	public allExcludeComplete: boolean = false;

	public tempCuisine: Cuisine = null;

	constructor(private _http: HttpClient, private _router: Router) { }

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
	}

	public addToFavorite(recipeToAdd: Recipe): void {
		this.loadLSRecipes();
		this.favouriteRecipesListLS.push(recipeToAdd);
		this.saveLSRecipes();
	}

	public deleteFromFavourite(recipeToDelete: Recipe): void {
		this.loadLSRecipes();
		const indexRecipeToDelete: number = this.favouriteRecipesListLS.findIndex((recipe: Recipe) => recipe.id === recipeToDelete.id);
		if (indexRecipeToDelete > -1) {
			console.log(`delete ${recipeToDelete.id}`);
			this.favouriteRecipesListLS.splice(indexRecipeToDelete, 1);
			console.log(this.favouriteRecipesListLS);
		}
		this.saveLSRecipes();

		// update view recipes
		if (this._router.url.includes('favourite')) {
			this.initRecipeList();
		}
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

	public initCuisinesSelect(): void {
		this._http.get<CuisinesSelect>(
			`${this._baseAssetsUrl}/cuisines-values/cuisines-values.json`
		).subscribe((data: CuisinesSelect) => {
			data.cuisinesValuesStrings.forEach((element: string) => {
				this.cuisinesValuesInclude.push(new Cuisine(element, false));
				this.cuisinesValuesExclude.push(new Cuisine(element, false));
			});
			this.cuisinesValuesInclude.shift();   // delete empty element
			this.cuisinesValuesExclude.shift();   // delete empty element
			this.selectCuisinesValues.cuisinesInclude = this.cuisinesValuesInclude;
			this.selectCuisinesValues.cuisinesExclude = this.cuisinesValuesExclude;
		});
	}

	public updateAllIncludeComplete(): void {
		this.allIncludeComplete = this.selectCuisinesValues.cuisinesInclude != null
			&& this.selectCuisinesValues.cuisinesInclude.every((cuisine: Cuisine) => cuisine.complete);
	}

	public updateAllExcludeComplete(): void {
		this.allExcludeComplete = this.selectCuisinesValues.cuisinesExclude != null
			&& this.selectCuisinesValues.cuisinesExclude.every((cuisine: Cuisine) => cuisine.complete);
	}

	public someIncludeComplete(): boolean {
		if (this.selectCuisinesValues.cuisinesInclude == null) {
			return false;
		}
		return this.selectCuisinesValues.cuisinesInclude.filter((cuisine: Cuisine) => cuisine.complete).length > 0 && !this.allIncludeComplete;
	}

	public someExcludeComplete(): boolean {
		if (this.selectCuisinesValues.cuisinesExclude == null) {
			return false;
		}
		return this.selectCuisinesValues.cuisinesExclude.filter((cuisine: Cuisine) => cuisine.complete).length > 0 && !this.allExcludeComplete;
	}

	public setAllInclude(completed: boolean): void {
		this.allIncludeComplete = completed;
		if (!(this.selectCuisinesValues.cuisinesInclude == null)) {
			this.selectCuisinesValues.cuisinesInclude.forEach((cuisine: Cuisine) => cuisine.complete = completed);
		}
	}

	public setAllExclude(completed: boolean): void {
		this.allExcludeComplete = completed;
		if (!(this.selectCuisinesValues.cuisinesExclude == null)) {
			this.selectCuisinesValues.cuisinesExclude.forEach((cuisine: Cuisine) => cuisine.complete = completed);
		}
	}

	// tslint:disable-next-line: no-empty
	public ngOnDestroy(): void {
	}
}
