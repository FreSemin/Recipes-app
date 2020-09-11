import { IAppState } from '../../states/app-state/app.state';
import { createSelector } from '@ngrx/store';
import { IRecipeJoke } from 'src/app/components/recipes/models/recipe-joke/recipe-joke';

// tslint:disable-next-line: typedef
const recipeJokeState = (state: IAppState) => state.recipeJoke;

// tslint:disable-next-line: typedef
export const selectRecipeJoke = createSelector(
	recipeJokeState,
	(state: IRecipeJoke) => state
);
