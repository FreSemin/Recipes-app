import { Action } from '@ngrx/store';

export enum ERecipeJokeActions {
	RecipeJokeGet = '[Recipe Joke] Get Joke',
	RecipeJokeGetSucces = '[Recipe Joke] Get Succes Joke',
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
