import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './states/app-state/app.state';
import { routerReducer } from '@ngrx/router-store';
import { sidebarReducer } from './reducer/side-bar/side-bar.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
	router: routerReducer,
	sidebar: sidebarReducer,
};
