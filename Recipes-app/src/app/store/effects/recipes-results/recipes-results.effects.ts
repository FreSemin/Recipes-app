import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { ERecipesResultsActions, RecipesResultsGetRandom, RecipesResultsGetRandomSucces, RecipesResultsLoadError } from '../../action/recipes-results/recipes-results.actions';
import { catchError, switchMap } from 'rxjs/operators';
import { IRecipeRandom } from 'src/app/components/recipes/models/recipe-random/recipe-random';

@Injectable()
export class RecipesResultsEffects {

	@Effect()
	public getRecipesResultsRandomRecipe$: Observable<any> = this._actions$.pipe(
		ofType<RecipesResultsGetRandom>(ERecipesResultsActions.RecipesResultsGetRandom),
		switchMap(() => this._recipesService.loadRecipeRandom()),
		switchMap((recipeJoke: IRecipeRandom) => {
			return of(new RecipesResultsGetRandomSucces(recipeJoke.recipes));
		}),
		catchError(() => of(new RecipesResultsLoadError()))
	);

	constructor(
		private _actions$: Actions,
		private _recipesService: RecipesService,
	) { }
}
