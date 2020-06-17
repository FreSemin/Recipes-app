import { Injectable, OnInit } from '@angular/core';
import { Recipe } from '../../components/recipes/models/recipe/recipe';
import { HttpClient } from '@angular/common/http';
import { RecipeBook } from 'src/app/components/recipes/models/recipes-book/recipes-book';
import { RecipeJoke } from 'src/app/components/recipes/models/recipe-joke/recipe-joke';

@Injectable({
	providedIn: 'root'
})
export class RecipesService implements OnInit {
	private _API_KEY: string = '?apiKey=6b81ee8ae3fb4592aa7f4d40e40b091b';

	public searchString: string = '';
	public jokeStr: string = '';

	// prefate requests for:
	// 1. get content for main - https://api.spoonacular.com/recipes/search_API_KEY&instructionsRequired=true&query=pancake&number=2
	// 2. get recepes with steps - https://api.spoonacular.com/recipes/677465/information_API_KEY

	public recipeBook: RecipeBook = null;
	public recipeResults: Recipe[] = [];

	public isSideBarEnabled: boolean = false;

	public isRecipesListLoading: boolean = false;

	constructor(private _http: HttpClient) { }

	public searchRecipes(searchString: string): void {
		this.isRecipesListLoading = true;
		this._http.get<RecipeBook>(`https://api.spoonacular.com/recipes/search${this._API_KEY}&instructionsRequired=true&query=${searchString}&number=15`)
			.subscribe((data: RecipeBook) => {
				this.recipeBook = new RecipeBook(data);
				this.isRecipesListLoading = false;
				this.showList();
			});
	}

	public showList(): void {
		this.recipeResults = [];
		this.recipeBook.results.forEach((element: Recipe) => {
			this.recipeResults.push(new Recipe(element));
		});
	}

	public onSearchRecipes(searchStr: string): void {
		this.searchRecipes(searchStr);
	}

	public getRandomJoke(): void {
		this._http.get<RecipeJoke>(`https://api.spoonacular.com/food/jokes/random${this._API_KEY}`).subscribe((joke: RecipeJoke) => {
			this.jokeStr = joke.text;
			console.log(joke);
		});
	}

	public sideBarToggel(): void {
		this.isSideBarEnabled = !this.isSideBarEnabled;
	}

	public ngOnInit(): void { }
}
