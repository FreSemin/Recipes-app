import { IAppState } from '../../states/app-state/app.state';
import { createSelector } from '@ngrx/store';
import { IRecipesResults } from '../../states/recipes-results/recipes-results.state';

// tslint:disable-next-line: typedef
const recipesResultsState = (state: IAppState) => state.recipesResults;

// tslint:disable-next-line: typedef
export const selectRecipesResults = createSelector(
	recipesResultsState,
	(state: IRecipesResults) => state
);
