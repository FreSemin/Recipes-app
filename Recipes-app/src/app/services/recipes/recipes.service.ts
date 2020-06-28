import { Injectable, OnInit } from '@angular/core';
import { Recipe } from '../../components/recipes/models/recipe/recipe';
import { HttpClient } from '@angular/common/http';
import { RecipeBook } from 'src/app/components/recipes/models/recipes-book/recipes-book';
import { RecipeJoke } from 'src/app/components/recipes/models/recipe-joke/recipe-joke';
import { RecipesDataService } from '../recipes-data/recipes-data.service';
import { Router } from '@angular/router';
import { RecipeWithDetails } from 'src/app/components/recipes/models/recipe-with-details/recipe-with-details';
import { Observable, combineLatest } from 'rxjs';
import Cuisine from 'src/app/models/cuisines/cuisines';

@Injectable({
	providedIn: 'root',
})
export class RecipesService implements OnInit {
	private _API_KEY: string = '?apiKey=6b81ee8ae3fb4592aa7f4d40e40b091b';

	public searchString: string = '';
	public jokeStr: string = '';

	public recipeBook: RecipeBook = null;
	public recipeResults: Recipe[] = [];

	public favouriteRecipes: Recipe[] = [];

	public isSideBarEnabled: boolean = false;
	public isRecipesListLoading: boolean = false;
	public isNothingFound: boolean = false;

	public recipeWithDetails: RecipeWithDetails = null;

	public resultCuisinesInclude: string[] = [];
	public resultCuisinesExclude: string[] = [];
	public includeCuisine: string = null;
	public excludeCuisine: string = null;

	public filterPanelCuisine: boolean = false;
	public filterPanelCalories: boolean = false;

	public thumbLabelSliders: boolean = true;

	public caloriesMinStartedValue: number = 10;
	public caloriesMaxStartedValue: number = 50;
	public caloriesMinValue: number = this.caloriesMinStartedValue;
	public caloriesMaxValue: number = this.caloriesMaxStartedValue;

	constructor(
		private _http: HttpClient,
		public recipesDataService: RecipesDataService,
		private _router: Router
	) { }

	public checkSearchOptions(): void {
		this.resultCuisinesInclude = [];
		this.resultCuisinesExclude = [];

		this.recipesDataService.selectCuisinesValues.cuisinesInclude.forEach((cuisine: Cuisine) => {
			if (cuisine.complete) {
				this.resultCuisinesInclude.push(`${cuisine.name},`);
			}
		});

		if (!(this.resultCuisinesInclude == null)) {
			this.resultCuisinesInclude.unshift('&cuisine=');
		}

		this.recipesDataService.selectCuisinesValues.cuisinesExclude.forEach((cuisine: Cuisine) => {
			if (cuisine.complete) {
				this.resultCuisinesExclude.push(`${cuisine.name},`);
			}
		});

		if (!(this.resultCuisinesExclude == null)) {
			this.resultCuisinesExclude.unshift('&excludeCuisine=');
		}
	}

	public searchRecipes(searchString: string): void {
		this.recipeResults = [];
		this.isRecipesListLoading = true;
		this.recipesDataService.setAllInclude(false);
		this.recipesDataService.setAllExclude(false);
		this.filterPanelCuisine = false;
		this.filterPanelCalories = false;


		this._http
			.get<RecipeBook>(
				`https://api.spoonacular.com/recipes/complexSearch${this._API_KEY}
				&query=${searchString}
				&instructionsRequired=true
				${this.resultCuisinesInclude}
				${this.resultCuisinesExclude}
				&minCalories=${this.caloriesMinValue}
				&maxCalories=${this.caloriesMaxValue}
				&maxFat=25&number=100`
			)
			.subscribe((data: RecipeBook) => {
				console.log(data);
				if (!(data.totalResults === 0)) {
					this.searchString = '';
					this.recipeBook = new RecipeBook(data);
					this.isRecipesListLoading = false;
					this.isNothingFound = false;
					this.showList();
				} else {
					this.isRecipesListLoading = false;
					this.isNothingFound = true;
				}
			});

		this.caloriesMinValue = this.caloriesMinStartedValue;
		this.caloriesMaxValue = this.caloriesMaxStartedValue;
	}

	public showList(): void {
		this.recipesDataService.loadLSRecipes();

		this.recipeResults = [];
		this.recipeBook.results.forEach((element: Recipe) => {
			this.recipeResults.push(new Recipe(element));
		});
	}

	public onSearchRecipes(searchStr: string): void {
		this.checkSearchOptions();
		this.searchRecipes(searchStr);
	}

	public getRandomJoke(): void {
		// this._http
		// 	.get<RecipeJoke>(
		// 		`https://api.spoonacular.com/food/jokes/random${this._API_KEY}`
		// 	)
		// 	.subscribe((joke: RecipeJoke) => {
		// 		this.jokeStr = joke.text;
		// 	});
	}

	public addToFavourite(recipe: Recipe): void {
		this.recipesDataService.addToFavorite(recipe);
	}

	public checkRecipeDetails(recipeId: number): Observable<RecipeWithDetails> {
		return this._http
			.get<RecipeWithDetails>(
				`https://api.spoonacular.com/recipes/${recipeId}/information${this._API_KEY}`
			);
	}

	public initRecipeDetails(recipeId: number): void {
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

	public sideBarToggel(): void {
		this.isSideBarEnabled = !this.isSideBarEnabled;
	}

	public checkForFavourite(recipe: Recipe): boolean {
		this.recipesDataService.loadLSRecipes();
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

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void { }
}
