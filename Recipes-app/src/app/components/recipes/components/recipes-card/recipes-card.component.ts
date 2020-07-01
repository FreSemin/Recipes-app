import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import Recipe from '../../models/recipe/recipe';

@Component({
	selector: 'app-recipes-card',
	templateUrl: './recipes-card.component.html',
	styleUrls: ['./recipes-card.component.scss'],
})
export class RecipesCardComponent implements OnInit {

	@Input()
	public recipe: Recipe;

	@Output()
	public onAddRecipeToFavourite: EventEmitter<Recipe> = new EventEmitter<Recipe>();

	@Output()
	public onDeleteRecipeFromFavourite: EventEmitter<Recipe> = new EventEmitter<Recipe>();

	@Output()
	public onCheckDetails: EventEmitter<Recipe> = new EventEmitter<Recipe>();

	@Input()
	public isFavorite: boolean;

	// tslint:disable-next-line: no-empty
	constructor() { }

	public addRecipeToFavourite(): void {
		this.onAddRecipeToFavourite.emit(this.recipe);
	}

	public deleteRecipeFromFavourite(): void {
		this.onDeleteRecipeFromFavourite.emit(this.recipe);
	}

	public checkDetails(): void {
		this.onCheckDetails.emit(this.recipe);
	}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
	}

}
