import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes/recipes.service';

@Component({
	selector: 'app-search-header',
	templateUrl: './search-header.component.html',
	styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent implements OnInit {

	constructor(public recipesService: RecipesService) { }

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
		this.recipesService.getRandomJoke();
	}

}
