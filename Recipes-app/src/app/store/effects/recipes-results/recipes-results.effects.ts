import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { ERecipesResultsActions, RecipesResultsGetFavorite, RecipesResultsGetFavoriteSucces, RecipesResultsGetRandom, RecipesResultsGetRandomSucces, RecipesResultsGetRecipeWithDetails, RecipesResultsGetRecipeWithDetailsInit, RecipesResultsGetRecipeWithDetailsSucces, RecipesResultsGetSearch, RecipesResultsGetSearchNoResults, RecipesResultsGetSearchSucces, RecipesResultsLoadError } from '../../action/recipes-results/recipes-results.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IRecipeRandom } from 'src/app/components/recipes/models/recipe-random/recipe-random';
import { RecipeBook } from 'src/app/components/recipes/models/recipes-book/recipes-book';
import Recipe, { IRecipe } from 'src/app/components/recipes/models/recipe/recipe';
import { IRecipeWithDetails } from 'src/app/components/recipes/models/recipe-with-details/recipe-with-details';
import { RecipesDataService } from 'src/app/services/recipes-data/recipes-data.service';

@Injectable()
export class RecipesResultsEffects {

	@Effect()
	public getRecipesResultsRandomRecipe$: Observable<any> = this._actions$.pipe(
		ofType<RecipesResultsGetRandom>(ERecipesResultsActions.RecipesResultsGetRandom),
		switchMap(() => this._recipesService.loadRecipeRandom()),
		switchMap((randomRecipes: IRecipeRandom) => {
			return of(new RecipesResultsGetRandomSucces(randomRecipes.recipes.map((element: IRecipe) => element = new Recipe(element))));
		}),
		catchError(() => of(new RecipesResultsLoadError()))
	);

	@Effect()
	public getRecipesResultsSearchRecipes$: Observable<any> = this._actions$.pipe(
		ofType<RecipesResultsGetSearch>(ERecipesResultsActions.RecipesResultsGetSearch),
		tap(() => this._recipesService.clearRecipesResults()),
		tap(() => this._recipesService.checkSearchOptions()),

		switchMap(() => this._recipesService.loadSearchRecipes()),
		switchMap((data: RecipeBook) => {
			if (data.results.length > 0) {
				return of(new RecipesResultsGetSearchSucces(data.results.map((element: IRecipe) => element = new Recipe(element))));
				// update images size by new Recipe()
			} else {
				return of(new RecipesResultsGetSearchNoResults());
			}
		}),

		tap(() => this._recipesService.clearFiltersFields()),
		catchError(() => of(new RecipesResultsLoadError()))
	);

	@Effect()
	public getRecipesResultsRecipeWithDetails$: Observable<any> = this._actions$.pipe(
		ofType<RecipesResultsGetRecipeWithDetailsSucces>(ERecipesResultsActions.RecipesResultsGetRecipeWithDetailsSucces),
		tap(() => this._recipesService.clearRecipesResults()),
		switchMap(() => of(new RecipesResultsGetRecipeWithDetailsInit(this._recipesService.recipeWithDetails))),
		catchError(() => of(new RecipesResultsLoadError()))
	);

	@Effect()
	public getRecipesResultsFavorite$: Observable<any> = this._actions$.pipe(
		ofType<RecipesResultsGetFavorite>(ERecipesResultsActions.RecipesResultsGetFavorite),
		tap(() => this._recipesService.clearRecipesResults()),
		switchMap(() => this._recipesDataService.initFavouriteRecipeList()),
		switchMap((favoriteRecipes: IRecipe[]) => {
			return of(new RecipesResultsGetFavoriteSucces(favoriteRecipes));
		}),
		catchError(() => of(new RecipesResultsLoadError()))
	);

	constructor(
		private _actions$: Actions,
		private _recipesService: RecipesService,
		private _recipesDataService: RecipesDataService,
	) { }
}
