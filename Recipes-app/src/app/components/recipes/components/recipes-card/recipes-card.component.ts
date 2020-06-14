import { Component, OnInit, Input } from '@angular/core';
import Recipe from '../../models/recipe/recipe';

@Component({
	selector: 'app-recipes-card',
	templateUrl: './recipes-card.component.html',
	styleUrls: ['./recipes-card.component.scss']
})
export class RecipesCardComponent implements OnInit {

	@Input()
	public recipe: Recipe;

	// tslint:disable-next-line: no-empty
	constructor() { }

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
	}

}
