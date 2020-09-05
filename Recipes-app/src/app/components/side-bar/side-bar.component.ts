import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SidebarToggle } from '../../store/action/side-bar/side-bar.action';

@Component({
	selector: 'app-side-bar',
	templateUrl: './side-bar.component.html',
	styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
	public sidebarState$: Observable<boolean>;

	constructor(private store: Store<{ sideBar: boolean }>) {
		this.sidebarState$ = store.pipe(select('sideBar'));
	}

	public sidebarToggle(): void {
		this.store.dispatch(new SidebarToggle());
	}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
	}
}
