import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { ERecipeJokeActions, RecipeJokeGet, RecipeJokeGetSucces, RecipeJokeLoadError } from '../../action/recipe-joke/recipe-joke.actions';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { IRecipeJoke } from 'src/app/components/recipes/models/recipe-joke/recipe-joke';

@Injectable()
export class RecipeJokeEffects {

	@Effect()
	public getRecipeJoke$: Observable<any> = this._actions$.pipe(
		ofType<RecipeJokeGet>(ERecipeJokeActions.RecipeJokeGet),
		switchMap(() => this._recipesService.loadRecipeJoke()),
		switchMap((recipeJoke: IRecipeJoke) => {
			return of(new RecipeJokeGetSucces(recipeJoke.text));
		}),
		catchError(() => of(new RecipeJokeLoadError()))
	);

	constructor(
		private _actions$: Actions,
		private _recipesService: RecipesService,
	) { }
}
