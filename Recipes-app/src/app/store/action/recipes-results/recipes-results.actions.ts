import { Action } from '@ngrx/store';
import { IRecipeWithDetails } from 'src/app/components/recipes/models/recipe-with-details/recipe-with-details';
import { IRecipe } from 'src/app/components/recipes/models/recipe/recipe';

export enum ERecipesResultsActions {
	RecipesResultsGetRandom = '[Recipes Results] Get Random',
	RecipesResultsGetRandomSucces = '[Recipes Results] Get Random Succes',
	RecipesResultsDeleteRandom = '[Recipes Results] Delete Random',
	RecipesResultsGetSearch = '[Recipes Results] Get Search',
	RecipesResultsGetSearchSucces = '[Recipes Results] Get Search Succes',
	RecipesResultsGetSearchNoResults = '[Recipes Results] Get Search No Results',
	RecipesResultsGetRecipeWithDetails = '[Recipes Results] Get Recipe With Details',
	RecipesResultsGetRecipeWithDetailsSucces = '[Recipes Results] Get Recipe With Details Succes',
	RecipesResultsGetRecipeWithDetailsInit = '[Recipes Results] Get Recipe With Details Init',
	RecipesResultsGetFavorite = '[Recipes Results] Get Favorite',
	RecipesResultsGetFavoriteSucces = '[Recipes Results] Get Favorite Succes',
	RecipesResultsGetLatest = '[Recipes Results] Get Latest',
	RecipesResultsGetLatestSucces = '[Recipes Results] Get Latest Succes',
	RecipesResultsClear = '[Recipes Results] Clear',
	RecipesResultsLoadError = '[Recipes Results] Load Error',
}

export interface CustomRecipesResultsAction extends Action {
	type: string;
	payload?: any;
}

export class RecipesResultsGetRandom implements CustomRecipesResultsAction {
	public readonly type: string = ERecipesResultsActions.RecipesResultsGetRandom;
}

// tslint:disable-next-line: max-classes-per-file
export class RecipesResultsGetRandomSucces implements CustomRecipesResultsAction {
	public readonly type: string = ERecipesResultsActions.RecipesResultsGetRandomSucces;

	constructor(public payload: IRecipe[]) { }
}

// tslint:disable-next-line: max-classes-per-file
export class RecipesResultsDeleteRandom implements CustomRecipesResultsAction {
	public readonly type: string = ERecipesResultsActions.RecipesResultsDeleteRandom;
}

// tslint:disable-next-line: max-classes-per-file
export class RecipesResultsGetSearch implements CustomRecipesResultsAction {
	public readonly type: string = ERecipesResultsActions.RecipesResultsGetSearch;
}

// tslint:disable-next-line: max-classes-per-file
export class RecipesResultsGetSearchSucces implements CustomRecipesResultsAction {
	public readonly type: string = ERecipesResultsActions.RecipesResultsGetSearchSucces;

	constructor(public payload: IRecipe[]) { }
}

// tslint:disable-next-line: max-classes-per-file
export class RecipesResultsGetSearchNoResults implements CustomRecipesResultsAction {
	public readonly type: string = ERecipesResultsActions.RecipesResultsGetSearchNoResults;
}

// tslint:disable-next-line: max-classes-per-file
export class RecipesResultsGetRecipeWithDetails implements CustomRecipesResultsAction {
	public readonly type: string = ERecipesResultsActions.RecipesResultsGetRecipeWithDetails;
}

// tslint:disable-next-line: max-classes-per-file
export class RecipesResultsGetRecipeWithDetailsSucces implements CustomRecipesResultsAction {
	public readonly type: string = ERecipesResultsActions.RecipesResultsGetRecipeWithDetailsSucces;
}

// tslint:disable-next-line: max-classes-per-file
export class RecipesResultsGetRecipeWithDetailsInit implements CustomRecipesResultsAction {
	public readonly type: string = ERecipesResultsActions.RecipesResultsGetRecipeWithDetailsInit;

	constructor(public payload: IRecipeWithDetails) { }
}

// tslint:disable-next-line: max-classes-per-file
export class RecipesResultsGetFavorite implements CustomRecipesResultsAction {
	public readonly type: string = ERecipesResultsActions.RecipesResultsGetFavorite;
}

// tslint:disable-next-line: max-classes-per-file
export class RecipesResultsGetFavoriteSucces implements CustomRecipesResultsAction {
	public readonly type: string = ERecipesResultsActions.RecipesResultsGetFavoriteSucces;

	constructor(public payload: IRecipe[]) { }
}

// tslint:disable-next-line: max-classes-per-file
export class RecipesResultsGetLatest implements CustomRecipesResultsAction {
	public readonly type: string = ERecipesResultsActions.RecipesResultsGetLatest;
}

// tslint:disable-next-line: max-classes-per-file
export class RecipesResultsGetLatestSucces implements CustomRecipesResultsAction {
	public readonly type: string = ERecipesResultsActions.RecipesResultsGetLatestSucces;

	constructor(public payload: IRecipe[]) { }
}

// tslint:disable-next-line: max-classes-per-file
export class RecipesResultsClear implements CustomRecipesResultsAction {
	public readonly type: string = ERecipesResultsActions.RecipesResultsClear;
}

// tslint:disable-next-line: max-classes-per-file
export class RecipesResultsLoadError implements CustomRecipesResultsAction {
	public readonly type: string = ERecipesResultsActions.RecipesResultsLoadError;
}
