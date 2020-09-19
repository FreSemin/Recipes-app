import { Action } from '@ngrx/store';

export enum ESidebarActions {
	SidebarToggleMode = '[Side Bar] Toggle Mode',
}

export class SidebarToggle implements Action {
	public readonly type: string = ESidebarActions.SidebarToggleMode;
}
