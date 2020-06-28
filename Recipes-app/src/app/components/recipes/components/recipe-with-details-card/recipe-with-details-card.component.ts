import {
	Component,
	OnInit,
	Input,
	OnDestroy,
	ChangeDetectionStrategy,
} from '@angular/core';
import { RecipeWithDetails } from '../../models/recipe-with-details/recipe-with-details';
import { RecipesService } from 'src/app/services/recipes/recipes.service';

@Component({
	selector: 'app-recipe-with-details-card',
	templateUrl: './recipe-with-details-card.component.html',
	styleUrls: ['./recipe-with-details-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeWithDetailsCardComponent implements OnInit, OnDestroy {
	public panelOpenState: boolean = false;

	@Input()
	public recipeWithDetails: RecipeWithDetails;

	// tslint:disable-next-line: no-empty
	constructor(
		public recipesService: RecipesService,
	) { }

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
	}

	public ngOnDestroy(): void {
		this.recipeWithDetails = null;
	}
}
