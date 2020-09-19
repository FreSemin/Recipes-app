import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './states/app-state/app.state';
import { routerReducer } from '@ngrx/router-store';
import { sidebarReducer } from './reducers/side-bar/side-bar.reducer';
import { recipeJokeReducer } from './reducers/recipe-joke/recipe-joke.reducers';
import { recipesResultsReducers } from './reducers/recipes-results/recipes-results.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
	router: routerReducer,
	sidebar: sidebarReducer,
	recipeJoke: recipeJokeReducer,
	recipesResults: recipesResultsReducers,
};
