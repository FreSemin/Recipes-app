import { Action } from '@ngrx/store';
import { ISidebar, initialSidebarState } from '../../states/side-bar/side-bar.state';
import { ESidebarActions } from '../../action/side-bar/side-bar.action';

export function sidebarReducer(state: ISidebar = initialSidebarState, action: Action): ISidebar {
	switch (action.type) {
		case ESidebarActions.SidebarToggleMode:
			return {
				...state,
				isSidebarEnabled: !state.isSidebarEnabled
			};

		default:
			return state;
	}
}
