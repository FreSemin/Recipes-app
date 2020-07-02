export interface IDietsSelect {
	dietsValues: string[];
}

export class DietsSelect implements IDietsSelect {
	public dietsValues: string[];

	constructor(dietsValues: string[]) {
		this.dietsValues = dietsValues;
	}
}

export default DietsSelect;
