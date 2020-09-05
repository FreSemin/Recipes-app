import { Action } from '@ngrx/store';
import { sidebarActionsTypes } from '../../action/side-bar/side-bar.action';

export const initialSideBarState: boolean = false;

export function sidebarReducer(state: boolean = initialSideBarState, action: Action): boolean {
	switch (action.type) {
		case sidebarActionsTypes.SidebarToggleMode:
			return state = !state;

		default:
			return state;
	}
}
