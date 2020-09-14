import { Action } from '@ngrx/store';
import { IRecipe } from 'src/app/components/recipes/models/recipe/recipe';

export enum ERecipesResultsActions {
	RecipesResultsGetRandom = '[Recipes Results] Get Random',
	RecipesResultsGetRandomSucces = '[Recipes Results] Get Random Succes',
	RecipesResultsDeleteRandom = '[Recipes Results] Delete Random',
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
export class RecipesResultsClear implements CustomRecipesResultsAction {
	public readonly type: string = ERecipesResultsActions.RecipesResultsClear;
}

// tslint:disable-next-line: max-classes-per-file
export class RecipesResultsLoadError implements CustomRecipesResultsAction {
	public readonly type: string = ERecipesResultsActions.RecipesResultsLoadError;
}
