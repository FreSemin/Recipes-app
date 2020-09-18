import { Injectable, OnInit } from '@angular/core';
import { Recipe } from '../../components/recipes/models/recipe/recipe';
import { HttpClient } from '@angular/common/http';
import { RecipeBook } from 'src/app/components/recipes/models/recipes-book/recipes-book';
import { IRecipeJoke } from 'src/app/components/recipes/models/recipe-joke/recipe-joke';
import { RecipesDataService } from '../recipes-data/recipes-data.service';
import { Router } from '@angular/router';
import { RecipeWithDetails } from 'src/app/components/recipes/models/recipe-with-details/recipe-with-details';
import { Observable, combineLatest, of } from 'rxjs';
import Cuisine from 'src/app/models/cuisines/cuisines';
import { IRecipeRandom } from 'src/app/components/recipes/models/recipe-random/recipe-random';
import { ISidebar } from 'src/app/store/states/side-bar/side-bar.state';
import { Store, select } from '@ngrx/store';
import { SidebarToggle } from 'src/app/store/actions/side-bar/side-bar.action';
import { IAppState } from 'src/app/store/states/app-state/app.state';
import { RecipeJokeGet } from 'src/app/store/actions/recipe-joke/recipe-joke.actions';
import { selectRecipeJoke } from 'src/app/store/selectors/recipe-joke/recipe-joke.selectors';
import { RecipesResultsClear, RecipesResultsGetFavorite, RecipesResultsGetLatest, RecipesResultsGetRandom, RecipesResultsGetRandomSucces, RecipesResultsGetRecipeWithDetails, RecipesResultsGetRecipeWithDetailsSucces, RecipesResultsGetSearch } from 'src/app/store/actions/recipes-results/recipes-results.actions';
import { IRecipesResults } from 'src/app/store/states/recipes-results/recipes-results.state';
import { selectRecipesResults } from 'src/app/store/selectors/recipes-results/recipes-results.selectors';

@Injectable({
	providedIn: 'root',
})
export class RecipesService implements OnInit {
	private _API_KEY: string = '?apiKey=6b81ee8ae3fb4592aa7f4d40e40b091b';

	public searchString: string = '';

	public recipeBook: RecipeBook = null;
	public recipeResults: Recipe[] = [];

	public sidebarState$: Observable<ISidebar>;
	public recipeJoke$: Observable<IRecipeJoke>;
	public recipesResults$: Observable<IRecipesResults>;

	public pageOfItems: Recipe[] = [];

	public favouriteRecipes: Recipe[] = [];
	public recipeWithDetails: RecipeWithDetails = null;

	public isNothingFound: boolean = false;
	public thumbLabelSliders: boolean = true;

	public selectedDiet: string = null;
	public selectedSorting: string = null;
	public selectedSortingDirection: string = null;
	public searchFavouriteStr: string = '';

	public resultCuisinesInclude: string[] = [];
	public resultCuisinesExclude: string[] = [];
	public includeCuisine: string = null;
	public excludeCuisine: string = null;

	public filterPanelCuisine: boolean = false;
	public filterPanelRecipeComponents: boolean = false;
	public filterPanelDiets: boolean = false;
	public filterPanelSorting: boolean = false;

	public caloriesMinStartedValue: number = 0;
	public caloriesMaxStartedValue: number = 1000;
	public caloriesMinValue: number = this.caloriesMinStartedValue;
	public caloriesMaxValue: number = this.caloriesMaxStartedValue;

	public readyTimeStartedValue: number = 1000;
	public readyTime: number = this.readyTimeStartedValue;

	public carbsMinStartedValue: number = 0;
	public carbsMaxStartedValue: number = 200;
	public carbsMinValue: number = this.carbsMinStartedValue;
	public carbsMaxValue: number = this.carbsMaxStartedValue;

	public proteinMinStartedValue: number = 0;
	public proteinMaxStartedValue: number = 200;
	public proteinMinValue: number = this.proteinMinStartedValue;
	public proteinMaxValue: number = this.proteinMaxStartedValue;

	public fatMinStartedValue: number = 0;
	public fatMaxStartedValue: number = 200;
	public fatMinValue: number = this.fatMinStartedValue;
	public fatMaxValue: number = this.fatMaxStartedValue;

	public isRecipesSortedByName: boolean = false;
	public isNothingFoundFavourite: boolean = false;
	public isRadomResipeExists: boolean = false;
	public isFiltersNeed: boolean = false;

	constructor(
		private _http: HttpClient,
		public recipesDataService: RecipesDataService,
		private _router: Router,
		private _store: Store<IAppState>
	) {
		this.sidebarState$ = _store.select((state: IAppState) => state.sidebar);
		this.recipesResults$ = this._store.pipe(select(selectRecipesResults));
		this.recipeJoke$ = this._store.pipe(select(selectRecipeJoke));
	}

	public initRecipesRandom(): void {
		this._store.dispatch(new RecipesResultsGetRandom());
	}

	public loadRecipeRandom(): Observable<IRecipeRandom> {
		return this._http.get<IRecipeRandom>(
			`https://api.spoonacular.com/recipes/random${this._API_KEY}`
		);
	}

	public initRecipeJoke(): void {
		this._store.dispatch(new RecipeJokeGet());
	}

	public loadRecipeJoke(): Observable<IRecipeJoke> {
		return this._http.get<IRecipeJoke>(
			`https://api.spoonacular.com/food/jokes/random${this._API_KEY}`
		);
	}

	public clearRecipesResults(): void {
		this._store.dispatch(new RecipesResultsClear());
	}

	public sidebarToggle(): void {
		this._store.dispatch(new SidebarToggle());
	}

	public checkSearchOptions(): void {
		this.resultCuisinesInclude = [];
		this.resultCuisinesExclude = [];

		this.recipesDataService.selectCuisinesValues.cuisinesInclude.forEach((cuisine: Cuisine) => {
			if (cuisine.complete) {
				this.resultCuisinesInclude.push(`${cuisine.name},`);
			}
		});

		if (this.resultCuisinesInclude.length > 0) {
			this.resultCuisinesInclude.unshift('&cuisine=');
		}

		this.recipesDataService.selectCuisinesValues.cuisinesExclude.forEach((cuisine: Cuisine) => {
			if (cuisine.complete) {
				this.resultCuisinesExclude.push(`${cuisine.name},`);
			}
		});

		if (this.resultCuisinesExclude.length > 0) {
			this.resultCuisinesExclude.unshift('&excludeCuisine=');
		}

		if (!(this.selectedDiet === null) && !(this.selectedDiet === undefined)) {
			this.selectedDiet = `&diet=${this.selectedDiet}`;
		} else {
			this.selectedDiet = '';
		}

		if (!(this.selectedSorting === null) && !(this.selectedSorting === undefined)) {
			this.selectedSorting = `&sort=${this.selectedSorting}`;
		} else {
			this.selectedSorting = '';
		}

		if (!(this.selectedSortingDirection === null) && !(this.selectedSortingDirection === undefined)) {
			this.selectedSortingDirection = `&sortDirection=${this.selectedSortingDirection}`;
		} else {
			this.selectedSortingDirection = '';
		}
	}

	public clearFiltersFields(): void {
		this.recipesDataService.setAllInclude(false);
		this.recipesDataService.setAllExclude(false);
		this.caloriesMinValue = this.caloriesMinStartedValue;
		this.caloriesMaxValue = this.caloriesMaxStartedValue;
		this.readyTime = this.readyTimeStartedValue;
		this.selectedDiet = null;
		this.selectedSorting = null;
		this.selectedSortingDirection = null;
		this.carbsMinValue = this.carbsMinStartedValue;
		this.carbsMaxValue = this.carbsMaxStartedValue;
		this.proteinMinValue = this.proteinMinStartedValue;
		this.proteinMaxValue = this.proteinMaxStartedValue;
		this.fatMinValue = this.fatMinStartedValue;
		this.fatMaxValue = this.fatMaxStartedValue;
		this.searchString = '';
	}

	public initSearchRecipes(): void {
		this._store.dispatch(new RecipesResultsGetSearch());
	}

	public loadSearchRecipes(): Observable<RecipeBook> {
		return this._http
			.get<RecipeBook>(
				`https://api.spoonacular.com/recipes/complexSearch${this._API_KEY}
			&query=${this.searchString}
			&instructionsRequired=true
			${this.resultCuisinesInclude}
			${this.resultCuisinesExclude}
			&minCalories=${this.caloriesMinValue}
			&maxCalories=${this.caloriesMaxValue}
			&minCarbs=${this.carbsMinValue}
			&maxCarbs=${this.carbsMaxValue}
			&minProtein=${this.proteinMinValue}
			&maxProtein=${this.proteinMaxValue}
			&minFat=${this.fatMinValue}
			&maxFat=${this.fatMaxValue}
			&maxReadyTime=${this.readyTime}
			${this.selectedDiet}
			${this.selectedSorting}
			${this.selectedSortingDirection}
			&number=100`
			);
	}

	public checkRecipeDetails(recipeId: number): Observable<RecipeWithDetails> {
		return this._http
			.get<RecipeWithDetails>(
				`https://api.spoonacular.com/recipes/${recipeId}/information${this._API_KEY}`
			);
	}

	public initRecipeDetails(recipe: Recipe, recipeIdFromUrl?: number): void {
		this._store.dispatch(new RecipesResultsGetRecipeWithDetails());

		let recipeId: number;

		if (recipe === null) {
			recipeId = recipeIdFromUrl;
		} else {
			recipeId = recipe.id;
			this.recipesDataService.addToLatest(recipe);
		}

		this._router
			.navigate(['/recipe-details', recipeId]);
		combineLatest([
			this.checkRecipeDetails(recipeId),
		])
			.subscribe(([recipeWithDetails]: [RecipeWithDetails]) => {
				this.recipeWithDetails = new RecipeWithDetails(recipeWithDetails);
				this._store.dispatch(new RecipesResultsGetRecipeWithDetailsSucces());
			});
	}

	public checkForRecipeWithDetails(): void {
		const idFromUrl: number = Number(this._router.url
			.slice(this._router.url.lastIndexOf('/') + 1)
		);

		if (this.recipeWithDetails === null && this._router.url.includes('recipe-details') === true && (isNaN(idFromUrl) === false)
		) {
			this.initRecipeDetails(null, idFromUrl);
		} else if (this._router.url.includes('recipe-details') === true && (this.recipeWithDetails === null || (isNaN(idFromUrl) === true))) {
			this.redirectToNotFound();
		}
	}

	public checkForFavouriteRecipes(): void {
		if (this._router.url.includes('favourite')) {
			this.recipesDataService.initFavouriteRecipeList();
		}
	}

	public loadFavorites(): void {
		this._store.dispatch(new RecipesResultsGetFavorite());
	}

	public loadLatest(): void {
		this._store.dispatch(new RecipesResultsGetLatest());
	}

	public checkForFavourite(recipe: Recipe): boolean {
		this.recipesDataService.loadLSFavouriteRecipes();
		return this.recipesDataService.favouriteRecipesListLS.some(
			(element: Recipe) => {
				if (recipe.id === element.id) {
					return true;
				} else {
					return false;
				}
			}
		);
	}

	public strToLowerCase(value: string): string {
		return Boolean(value) ? value.toLowerCase() : '';
	}

	public sortFavouriteByName(): void {
		this.recipesResults$
			.subscribe((recipesResultsData: IRecipesResults) => {
				this.pageOfItems = (recipesResultsData.recipes.slice()
					.sort((recipe: Recipe, anotherRecipe: Recipe) => {
						const recipeTitle: string = this.strToLowerCase(recipe.title);
						const anotherRecipeTitle: string = this.strToLowerCase(anotherRecipe.title);
						const result: boolean = this.isRecipesSortedByName
							? recipeTitle < anotherRecipeTitle
							: recipeTitle > anotherRecipeTitle;
						return result ? 1 : -1;
					})
				);
				this.isRecipesSortedByName = !this.isRecipesSortedByName;
			});
	}

	public searchFavourite(): void {
		this.recipesResults$
			.subscribe((recipesResultsData: IRecipesResults) => {
				if (!(this.searchFavouriteStr === '')) {
					this.pageOfItems = (recipesResultsData.recipes.filter((recipe: Recipe) => {
						return this.strToLowerCase(recipe.title).includes(
							this.strToLowerCase(this.searchFavouriteStr)
						);
					}));
				} else {
					this.pageOfItems = recipesResultsData.recipes;
				}
			});

		if (this.pageOfItems.length === 0) {
			this.isNothingFoundFavourite = true;
		} else {
			this.isNothingFoundFavourite = false;
		}
	}

	public redirectToNotFound(): void {
		this._router.navigate(['/not-found']);
	}

	public onChangePage(pageOfItems: Recipe[]): void {
		this.pageOfItems = pageOfItems;  // update current page of items
		window.scroll(0, 0);
	}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void { }
}
