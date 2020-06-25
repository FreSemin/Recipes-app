export interface ICuisinesSelect {
	cuisinesValues: string[];
}

export class CuisinesSelect implements ICuisinesSelect {
	public cuisinesValues: string[];

	constructor(cuisinesValues: string[]) {
		this.cuisinesValues = cuisinesValues;
	}
}

export default CuisinesSelect;
