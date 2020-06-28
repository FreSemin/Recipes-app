import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../components/recipes/models/recipe/recipe';
import { HttpClient } from '@angular/common/http';
import CuisinesSelect from 'src/app/models/cuisines-select/cuisines-select';
import Cuisine from 'src/app/models/cuisines/cuisines';

@Injectable()
export class RecipesDataService implements OnInit, OnDestroy {

	private static _recipeListKey: string = 'app-recipe-list';
	private _baseAssetsUrl: string = 'assets';

	public selectCuisinesValues: CuisinesSelect = {
		cuisinesValues: [new Cuisine('', false)],
		cuisinesValuesStrings: [''],
	};

	public cuisinesValues: Cuisine[] = [new Cuisine('', false)];

	public favouriteRecipesList: Recipe[] = [];

	public favouriteRecipesListLS: Recipe[] = [];

	public allComplete: boolean = false;

	public tempCuisine: Cuisine = null;

	constructor(private _http: HttpClient) { }

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

	public initCuisinesSelect(): void {
		this._http.get<CuisinesSelect>(
			`${this._baseAssetsUrl}/cuisines-values/cuisines-values.json`
		).subscribe((data: CuisinesSelect) => {
			data.cuisinesValuesStrings.forEach((element: string) => {
				this.cuisinesValues.push(new Cuisine(element, false));
			});
			this.cuisinesValues.shift();   // delete empty element
			this.selectCuisinesValues.cuisinesValues = this.cuisinesValues;
		});
	}

	public updateAllComplete() {
		this.allComplete = this.selectCuisinesValues.cuisinesValues != null && this.selectCuisinesValues.cuisinesValues.every(t => t.complete);
	}

	public someComplete(): boolean {
		if (this.selectCuisinesValues.cuisinesValues == null) {
			return false;
		}
		return this.selectCuisinesValues.cuisinesValues.filter(t => t.complete).length > 0 && !this.allComplete;
	}

	public setAll(completed: boolean) {
		this.allComplete = completed;
		if (this.selectCuisinesValues.cuisinesValues == null) {
			return;
		}
		this.selectCuisinesValues.cuisinesValues.forEach(t => t.complete = completed);
	}

	// tslint:disable-next-line: no-empty
	public ngOnDestroy(): void {
	}
}
