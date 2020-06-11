import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes/recipes.service';
// import { FormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent implements OnInit {

  private _API_KEY: string = '?apiKey=6b81ee8ae3fb4592aa7f4d40e40b091b';

  public searchString: string = '';

  // prefate requests for:
  // 1. get content for main - https://api.spoonacular.com/recipes/search_API_KEY&instructionsRequired=true&query=pancake&number=2
  // 2. get recepes with steps - https://api.spoonacular.com/recipes/677465/information_API_KEY

  constructor(public recipesService: RecipesService) { }

  public ngOnInit(): void { }

  public searchRecipes(searchString: string): void {
	this.getRequest(`https://api.spoonacular.com/recipes/search${this._API_KEY}&instructionsRequired=true&query=${searchString}&number=2`)
		.then((response: Response) => {
		console.log(response);
		}).catch((error: Error) => {
		console.log(error);
	});
	this.recipesService.showList();
  }

  public getRequest(url: string): Promise<any> {
	return new Promise<any>(
		(resolve: any, reject: any) => {
		const request: XMLHttpRequest = new XMLHttpRequest();
		request.responseType = 'json';
		request.onload = function (): void {
		const goodStatus: number = 200;
			if (this.status === goodStatus) {
			resolve(this.response);
			} else {
			reject(new Error(this.statusText));
			}
		};
		request.onerror = function (): void {
			reject(new Error('XMLHttpRequest Error: ' + this.statusText));
		};
		request.open('GET', url);
		request.send();
		});
  }
}
