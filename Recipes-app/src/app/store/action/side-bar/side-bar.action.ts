import { Action } from '@ngrx/store';

export enum sidebarActionsTypes {
	SidebarToggleMode = '[Side Bar] Toggle Mode',
}

export class SidebarToggle implements Action {
	public readonly type: string = sidebarActionsTypes.SidebarToggleMode;
}
