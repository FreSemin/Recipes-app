import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes/recipes.service';
import { RecipesDataService } from 'src/app/services/recipes-data/recipes-data.service';

@Component({
	selector: 'app-search-header',
	templateUrl: './search-header.component.html',
	styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent implements OnInit {

	constructor(public recipesService: RecipesService, public recipesDataService: RecipesDataService) { }

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
		this.recipesService.getRandomJoke();
		this.recipesDataService.initCuisinesSelect();
	}

}
