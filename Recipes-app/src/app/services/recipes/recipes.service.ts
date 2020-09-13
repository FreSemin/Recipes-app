import { Injectable, OnInit } from '@angular/core';
import { Recipe } from '../../components/recipes/models/recipe/recipe';
import { HttpClient } from '@angular/common/http';
import { RecipeBook } from 'src/app/components/recipes/models/recipes-book/recipes-book';
import { RecipeJoke, IRecipeJoke } from 'src/app/components/recipes/models/recipe-joke/recipe-joke';
import { RecipesDataService } from '../recipes-data/recipes-data.service';
import { Router } from '@angular/router';
import { RecipeWithDetails } from 'src/app/components/recipes/models/recipe-with-details/recipe-with-details';
import { Observable, combineLatest } from 'rxjs';
import Cuisine from 'src/app/models/cuisines/cuisines';
import RecipesRandom from 'src/app/components/recipes/models/recipe-random/recipe-random';
import { ISidebar } from 'src/app/store/states/side-bar/side-bar.state';
import { Store, select } from '@ngrx/store';
import { SidebarToggle } from 'src/app/store/action/side-bar/side-bar.action';
import { IAppState } from 'src/app/store/states/app-state/app.state';
import { RecipeJokeGet } from 'src/app/store/action/recipe-joke/recipe-joke.actions';
import { selectRecipeJoke } from 'src/app/store/selectors/recipe-joke/recipe-joke.selectors';

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

	public pageOfItems: Recipe[] = [];
	public elementsRes: Recipe[] = [];

	public favouriteRecipes: Recipe[] = [];
	public recipeWithDetails: RecipeWithDetails = null;

	public isRecipesListLoading: boolean = false;
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
	}

	public getRandomRecipe(): void {
		this.isRecipesListLoading = true;
		this._http
			.get<RecipesRandom>(
				`https://api.spoonacular.com/recipes/random${this._API_KEY}&number=1`
			)
			.subscribe((randomRecipes: RecipesRandom) => {
				console.log(randomRecipes);
				this.elementsRes = [];
				this.elementsRes.push(new Recipe(randomRecipes.recipes[0]));  // only 1 element will get from the request
				// this.recipeResults.push(new Recipe(randomRecipes.recipes[0]));  // only 1 element will get from the request
				this.isRadomResipeExists = true;
				this.isRecipesListLoading = false;
			});
	}

	public initRecipeJoke(): void {
		this._store.dispatch(new RecipeJokeGet());
		this.recipeJoke$ = this._store.pipe(select(selectRecipeJoke));
	}

	public loadRecipeJoke(): Observable<IRecipeJoke> {
		return this._http.get<IRecipeJoke>(
			`https://api.spoonacular.com/food/jokes/random${this._API_KEY}`
		);
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
	}

	public showList(): void {
		// this.recipesDataService.loadLSFavouriteRecipes();
		this.elementsRes = [];
		// this.recipeResults = [];
		// this.recipeBook.results.forEach((element: Recipe) => {
			// this.recipeResults.push(new Recipe(element));
		// });
		// this.elementsRes = this.recipeBook.results;
		this.recipeBook.results.forEach((element: Recipe) => {
			this.elementsRes.push(new Recipe(element));
		});
		console.log(this.recipeBook.results);
	}

	public searchRecipes(searchString: string): void {
		this.checkSearchOptions();

		// this.recipeResults = [];
		this.elementsRes = [];

		this.isRecipesListLoading = true;
		// this.isRadomResipeExists = false;
		this.isNothingFound = false;

		this._http
			.get<RecipeBook>(
				`https://api.spoonacular.com/recipes/complexSearch${this._API_KEY}
				&query=${searchString}
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
			)
			.subscribe((data: RecipeBook) => {
				console.log(data);
				if (!(data.totalResults === 0)) {
					this.searchString = '';
					this.recipeBook = new RecipeBook(data);
					this.isRecipesListLoading = false;
					this.isNothingFound = false;
					console.log(this.recipeBook);
					this.showList();
				} else {
					this.isRecipesListLoading = false;
					this.isNothingFound = true;
				}
			});

		this.clearFiltersFields();
	}

	public checkRecipeDetails(recipeId: number): Observable<RecipeWithDetails> {
		return this._http
			.get<RecipeWithDetails>(
				`https://api.spoonacular.com/recipes/${recipeId}/information${this._API_KEY}`
			);
	}

	public initRecipeDetails(recipe: Recipe, recipeIdFromUrl?: number): void {
		let recipeId: number;

		if (recipe === null) {
			recipeId = recipeIdFromUrl;
		} else {
			recipeId = recipe.id;
			this.recipesDataService.addToLatest(recipe);
		}

		this._router
			.navigate(['/recipe-details', recipeId]);
		this.isRecipesListLoading = true;
		combineLatest([
			this.checkRecipeDetails(recipeId),
		])
			.subscribe(([recipeWithDetails]: [RecipeWithDetails]) => {
				this.recipeWithDetails = new RecipeWithDetails(recipeWithDetails);
				this.isRecipesListLoading = false;
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
		this.pageOfItems = this.recipesDataService.favouriteRecipesList
			.sort((recipe: Recipe, anotherRecipe: Recipe) => {
				const recipeTitle: string = this.strToLowerCase(recipe.title);
				const anotherRecipeTitle: string = this.strToLowerCase(anotherRecipe.title);
				const result: boolean = this.isRecipesSortedByName
					? recipeTitle < anotherRecipeTitle
					: recipeTitle > anotherRecipeTitle;
				return result ? 1 : -1;
			});
		this.isRecipesSortedByName = !this.isRecipesSortedByName;
	}

	public searchFavourite(): void {
		if (!(this.searchFavouriteStr === '')) {
			this.pageOfItems = this.recipesDataService.favouriteRecipesList.filter((recipe: Recipe) => {
				return this.strToLowerCase(recipe.title).includes(
					this.strToLowerCase(this.searchFavouriteStr)
				);
			});
		} else {
			this.pageOfItems = this.recipesDataService.favouriteRecipesList;
		}

		if (this.pageOfItems.length === 0) {
			this.isNothingFoundFavourite = true;
		} else {
			this.isNothingFoundFavourite = false;
		}
	}

	public redirectToNotFound(): void {
		this._router.navigate(['/not-found']);
	}

	public onChangePage(pageOfItems: Recipe[] | any[]): void {
		this.pageOfItems = pageOfItems;  // update current page of items
		window.scroll(0, 0);
	}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void { }
}
