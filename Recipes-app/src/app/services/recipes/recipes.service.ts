import { Injectable, OnInit } from '@angular/core';
import { Recipe } from '../../components/recipes/models/recipe/recipe';
import { HttpClient } from '@angular/common/http';
import { RecipeBook } from 'src/app/components/recipes/models/recipes-book/recipes-book';
import { RecipeJoke } from 'src/app/components/recipes/models/recipe-joke/recipe-joke';
import { RecipesDataService } from '../recipes-data/recipes-data.service';
import { Router } from '@angular/router';
import { RecipeWithDetails } from 'src/app/components/recipes/models/recipe-with-details/recipe-with-details';
import { Observable, combineLatest } from 'rxjs';

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

	constructor(
		private _http: HttpClient,
		public recipesDataService: RecipesDataService,
		private _router: Router
	) { }

	public searchRecipes(searchString: string): void {
		this.recipeResults = [];
		this.isRecipesListLoading = true;
		this._http
			.get<RecipeBook>(
				`https://api.spoonacular.com/recipes/search${this._API_KEY}&instructionsRequired=true&query=${searchString}&number=100`
			)
			.subscribe((data: RecipeBook) => {
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
	}

	public showList(): void {
		this.recipesDataService.loadLSRecipes();

		this.recipeResults = [];
		this.recipeBook.results.forEach((element: Recipe) => {
			this.recipeResults.push(new Recipe(element));
		});
	}

	public onSearchRecipes(searchStr: string): void {
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
		// this.isRecipesListLoading = true;
		// return this._router
		// .navigate(['/recipe-details', recipeId])
		// .then(() => {
		return this._http
			.get<RecipeWithDetails>(
				`https://api.spoonacular.com/recipes/${recipeId}/information${this._API_KEY}`
			);
		// .subscribe((recipeWithDetails: RecipeWithDetails) => {
		// this.recipeWithDetails = new RecipeWithDetails(recipeWithDetails);
		// console.log(recipeWithDetails);
		// });
		// })
		// .finally(() => {
		// this.isRecipesListLoading = false;
		// });
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
				console.log(recipeWithDetails);
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
