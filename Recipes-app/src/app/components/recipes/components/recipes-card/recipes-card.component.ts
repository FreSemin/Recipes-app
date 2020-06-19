import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Recipe from '../../models/recipe/recipe';

@Component({
	selector: 'app-recipes-card',
	templateUrl: './recipes-card.component.html',
	styleUrls: ['./recipes-card.component.scss']
})
export class RecipesCardComponent implements OnInit {

	@Input()
	public recipe: Recipe;

	@Output()
	public onAddRecipeToFavourite: EventEmitter<Recipe> = new EventEmitter<Recipe>();

	@Input()
	public favouriteCardStructure: HTMLElement = null;

	// tslint:disable-next-line: no-empty
	constructor() { }

	public addRecipeToFavourite(): void {
		this.onAddRecipeToFavourite.emit(this.recipe);
	}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
	}

}
