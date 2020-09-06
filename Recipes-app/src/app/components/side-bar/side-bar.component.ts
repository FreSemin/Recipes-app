import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SidebarToggle } from '../../store/action/side-bar/side-bar.action';
import { ISidebar } from 'src/app/store/states/side-bar/side-bar.state';

@Component({
	selector: 'app-side-bar',
	templateUrl: './side-bar.component.html',
	styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
	public sidebarState$: Observable<ISidebar>;

	constructor(private store: Store<{ sideBar: ISidebar }>) {
		this.sidebarState$ = store.pipe(select('sideBar'));
	}

	public sidebarToggle(): void {
		this.store.dispatch(new SidebarToggle());
	}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
	}
}
