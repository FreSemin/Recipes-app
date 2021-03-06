import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { IRecipe, Recipe } from '../../components/recipes/models/recipe/recipe';
import { HttpClient } from '@angular/common/http';
import CuisinesSelect from 'src/app/models/cuisines-select/cuisines-select';
import Cuisine from 'src/app/models/cuisines/cuisines';
import { Router } from '@angular/router';
import DietsSelect from 'src/app/models/diets-select/diets-select';
import SortingsSelect from 'src/app/models/sortings-select/sortings-select';
import { Observable, of } from 'rxjs';
import { RecipesResultsClear, RecipesResultsGetFavorite } from 'src/app/store/actions/recipes-results/recipes-results.actions';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/states/app-state/app.state';

@Injectable()
export class RecipesDataService implements OnInit, OnDestroy {
	private static _recipeFavouriteListKey: string = 'app-recipe-list';
	private static _recipeLatestListKey: string = 'app-recipe-latest-list';
	private _baseAssetsUrl: string = 'assets';

	public selectDietsValues: string[] = [];
	public selectSortingsValues: string[] = [];

	public selectCuisinesValues: CuisinesSelect = {
		cuisinesInclude: [new Cuisine('', false)],
		cuisinesExclude: [new Cuisine('', false)],
		cuisinesValuesStrings: [''],
	}; // "empty arr"

	public favouriteRecipesList: Recipe[] = [];
	public favouriteRecipesListLS: Recipe[] = [];

	public latestRecipesList: Recipe[] = [];
	public latestRecipesListLS: Recipe[] = [];

	public cuisinesValuesInclude: Cuisine[] = [new Cuisine('', false)];
	public cuisinesValuesExclude: Cuisine[] = [new Cuisine('', false)];

	public allIncludeComplete: boolean = false;
	public allExcludeComplete: boolean = false;

	public tempCuisine: Cuisine = null;

	constructor(private _http: HttpClient, private _router: Router, private _store: Store<IAppState>) { }

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
	}

	public initDietsSelect(): void {
		this._http.get<DietsSelect>(
			`${this._baseAssetsUrl}/json/diets-values/diets-values.json`
		).subscribe((data: DietsSelect) => {
			this.selectDietsValues = data.dietsValues;
		});
	}

	public initSortingSelect(): void {
		this._http.get<SortingsSelect>(
			`${this._baseAssetsUrl}/json/sortings-values/sortings-values.json`
		).subscribe((data: SortingsSelect) => {
			this.selectSortingsValues = data.sortingsValues;
		});
	}

	public initFilters(): void {
		this.initCuisinesSelect();
		this.initDietsSelect();
		this.initSortingSelect();
	}

	public addToFavorite(recipeToAdd: Recipe): void {
		this.loadLSFavouriteRecipes();
		this.favouriteRecipesListLS.push(recipeToAdd);
		this.saveLSFavouriteRecipes();
	}

	public addToLatest(recipeToAdd: Recipe): void {
		this.loadLSLatestRecipes();
		if (this.checkForLatest(recipeToAdd.id) === false) {
			this.latestRecipesListLS.push(recipeToAdd);
			this.saveLSLatestRecipes();
		}
	}

	public deleteFromFavourite(recipeToDelete: Recipe): void {
		this.loadLSFavouriteRecipes();
		const indexRecipeToDelete: number = this.favouriteRecipesListLS.findIndex((recipe: Recipe) => recipe.id === recipeToDelete.id);
		if (indexRecipeToDelete > -1) {
			this.favouriteRecipesListLS.splice(indexRecipeToDelete, 1);
		}
		this.saveLSFavouriteRecipes();

		// update view recipes
		if (this._router.url.includes('favourite')) {
			this.initFavouriteRecipeList();
			this._store.dispatch(new RecipesResultsGetFavorite());
		}
	}

	public loadLSFavouriteRecipes(): void {
		const recipesFavouriteLS: string = localStorage.getItem(RecipesDataService._recipeFavouriteListKey);
		if (Boolean(recipesFavouriteLS)) {
			this.favouriteRecipesListLS = JSON.parse(localStorage.getItem(RecipesDataService._recipeFavouriteListKey));
		} else {
			this.saveLSFavouriteRecipes();
		}
	}

	public loadLSLatestRecipes(): void {
		const recipesLatestLS: string = localStorage.getItem(RecipesDataService._recipeLatestListKey);
		if (Boolean(recipesLatestLS)) {
			this.latestRecipesListLS = JSON.parse(localStorage.getItem(RecipesDataService._recipeLatestListKey));
		} else {
			this.saveLSLatestRecipes();
		}
	}

	public saveLSFavouriteRecipes(): void {
		const recipesToSaveFavourite: string = JSON.stringify(this.favouriteRecipesListLS);
		localStorage.setItem(RecipesDataService._recipeFavouriteListKey, recipesToSaveFavourite);
	}

	public saveLSLatestRecipes(): void {
		const recipesToSaveLatest: string = JSON.stringify(this.latestRecipesListLS);
		localStorage.setItem(RecipesDataService._recipeLatestListKey, recipesToSaveLatest);
	}

	public initFavouriteRecipeList(): Observable<any> {
		this.loadLSFavouriteRecipes();
		this.favouriteRecipesList = this.favouriteRecipesListLS;

		return of(this.favouriteRecipesList);
	}

	public initLatestRecipeList(): Observable<any> {
		this.loadLSLatestRecipes();
		this.latestRecipesList = this.latestRecipesListLS;

		return of(this.latestRecipesList);
	}

	public clearFavouriteList(): void {
		this.loadLSFavouriteRecipes();
		this.favouriteRecipesListLS = [];
		this.saveLSFavouriteRecipes();
		this.initFavouriteRecipeList();
		this._store.dispatch(new RecipesResultsClear());
	}

	public clearLatestList(): void {
		this.loadLSLatestRecipes();
		this.latestRecipesListLS = [];
		this.saveLSLatestRecipes();
		this.initLatestRecipeList();
		this._store.dispatch(new RecipesResultsClear());
	}

	public checkForLatest(recipeId: number): boolean {
		this.loadLSLatestRecipes();
		return this.latestRecipesListLS.some(
			(element: Recipe) => {
				if (recipeId === element.id) {
					return true;
				} else {
					return false;
				}
			}
		);
	}

	//#region Cuisines start
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

	public initCuisinesSelect(): void {
		this._http.get<CuisinesSelect>(
			`${this._baseAssetsUrl}/json/cuisines-values/cuisines-values.json`
		).subscribe((data: CuisinesSelect) => {
			if (this.cuisinesValuesInclude.length > 0 && this.cuisinesValuesExclude.length > 0) {
				this.cuisinesValuesInclude = [];
				this.cuisinesValuesExclude = [];
			}
			data.cuisinesValuesStrings.forEach((element: string) => {
				this.cuisinesValuesInclude.push(new Cuisine(element, false));
				this.cuisinesValuesExclude.push(new Cuisine(element, false));
			});
			this.selectCuisinesValues.cuisinesInclude = this.cuisinesValuesInclude;
			this.selectCuisinesValues.cuisinesExclude = this.cuisinesValuesExclude;
		});
	}
	//#endregion Cuisines end

	// tslint:disable-next-line: no-empty
	public ngOnDestroy(): void {
	}
}
