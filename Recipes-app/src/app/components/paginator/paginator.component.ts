import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import paginate from 'jw-paginate';

@Component({
	selector: 'app-pagination',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss'],
})

export class PaginationComponent implements OnInit, OnChanges {
	@Input()
	public items: any[];

	@Output()
	public changePage: EventEmitter<any> = new EventEmitter<any>(true);

	@Input()
	public initialPage: number = 1;

	@Input()
	public pageSize: number = 5;

	@Input()
	public maxPages: number = 5;

	public pager: any = {};

	public ngOnInit(): void {
		if (this.items && this.items.length > 0) {
			this.setPage(this.initialPage);
		}
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.items.currentValue !== changes.items.previousValue) {
			this.setPage(this.initialPage);
		}
	}

	public setPage(page: number): void {
		this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);

		const pageOfItems: any[] = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);

		this.changePage.emit(pageOfItems);
	}
}
