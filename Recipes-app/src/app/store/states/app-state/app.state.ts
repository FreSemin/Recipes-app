import { RouterReducerState } from '@ngrx/router-store';
import { ISidebar, initialSidebarState } from '../side-bar/side-bar.state';
import { IRecipeJoke } from 'src/app/components/recipes/models/recipe-joke/recipe-joke';
import { initialRecipeJokeState } from '../recipe-joke/recipe-joke.state';
import { initialRecipesResultsState, IRecipesResults } from '../recipes-results/recipes-results.state';

export interface IAppState {
	router?: RouterReducerState;
	sidebar: ISidebar;
	recipeJoke: IRecipeJoke;
	recipesResults: IRecipesResults;
}

export const intialAppState: IAppState = {
	sidebar: initialSidebarState,
	recipeJoke: initialRecipeJokeState,
	recipesResults: initialRecipesResultsState,
};

export function getInitialState(): IAppState {
	return intialAppState;
}
