import { Injectable } from '@angular/core';
import { Recipe } from '../../components/recipes/models/recipe/recipe';
import { HttpClient } from '@angular/common/http';
import { RecipeBook } from 'src/app/components/recipes/models/recipes-book/recipes-book';

@Injectable({
	providedIn: 'root'
})
export class RecipesService {
	private _API_KEY: string = '?apiKey=6b81ee8ae3fb4592aa7f4d40e40b091b';

	public searchString: string = '';

	// prefate requests for:
	// 1. get content for main - https://api.spoonacular.com/recipes/search_API_KEY&instructionsRequired=true&query=pancake&number=2
	// 2. get recepes with steps - https://api.spoonacular.com/recipes/677465/information_API_KEY

	public recipeBook: RecipeBook = null;
	public recipeResults: Recipe[] = [];

	constructor(private _http: HttpClient) { }

	public searchRecipes(searchString: string): void {
		this._http.get<RecipeBook>(`https://api.spoonacular.com/recipes/search${this._API_KEY}&instructionsRequired=true&query=${searchString}&number=5`)
			.subscribe((data: RecipeBook) => {
				this.recipeBook = new RecipeBook(data);
				this.showList();
			});
	}

	public showList(): void {
		this.recipeBook.results.forEach((element: Recipe) => {
			this.recipeResults.push(new Recipe(element));
		});
	}

	public onSearchRecipes(searchStr: string): void {
		this.searchRecipes(searchStr);
	}
}
