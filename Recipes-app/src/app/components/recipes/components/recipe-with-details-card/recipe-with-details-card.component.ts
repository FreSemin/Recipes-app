import {
	Component,
	OnInit,
	Input,
	OnDestroy,
} from '@angular/core';
import { RecipeWithDetails } from '../../models/recipe-with-details/recipe-with-details';
import { RecipesService } from 'src/app/services/recipes/recipes.service';

@Component({
	selector: 'app-recipe-with-details-card',
	templateUrl: './recipe-with-details-card.component.html',
	styleUrls: ['./recipe-with-details-card.component.scss'],
})
export class RecipeWithDetailsCardComponent implements OnInit, OnDestroy {
	@Input()
	public recipeWithDetails: RecipeWithDetails;

	constructor(
		public recipesService: RecipesService,
	) { }

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
	}

	public ngOnDestroy(): void {
		this.recipesService.clearRecipesResults();
	}
}
