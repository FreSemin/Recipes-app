import { Action } from '@ngrx/store';

export enum ERecipeJokeActions {
	RecipeJokeGet = '[Recipe Joke] Get Joke',
	RecipeJokeGetSucces = '[Recipe Joke] Get Joke Succes',
	RecipeJokeLoadError = '[Recipe Joke] Load Error'
}

export interface CustomActions extends Action {
	type: string;
	payload?: any;
}

export class RecipeJokeGet implements CustomActions {
	public readonly type: string = ERecipeJokeActions.RecipeJokeGet;
}

// tslint:disable-next-line: max-classes-per-file
export class RecipeJokeGetSucces implements CustomActions {
	public readonly type: string = ERecipeJokeActions.RecipeJokeGetSucces;

	constructor(public payload: string) { }
}

// tslint:disable-next-line: max-classes-per-file
export class RecipeJokeLoadError implements CustomActions {
	public readonly type: string = ERecipeJokeActions.RecipeJokeLoadError;
}
