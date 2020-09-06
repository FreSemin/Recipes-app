import { RouterReducerState } from '@ngrx/router-store';
import { ISidebar, initialSidebarState } from '../side-bar/side-bar.state';

export interface IAppState {
	router?: RouterReducerState;
	sidebar: ISidebar;
}

export const intialAppState: IAppState = {
	sidebar: initialSidebarState,
};

export function getInitialState(): IAppState {
	return intialAppState;
}
