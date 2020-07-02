export interface ISortingsSelect {
	sortingsValues: string[];
}

export class SortingsSelect implements ISortingsSelect {
	public sortingsValues: string[];

	constructor(SortingsValues: string[]) {
		this.sortingsValues = SortingsValues;
	}
}

export default SortingsSelect;
