export interface ICuisine {
	name: string;
	complete: boolean;
}

export class Cuisine implements ICuisine {
	public name: string = '';
	public complete: boolean = false;

	constructor(cuisineName: string, isCompete: boolean) {
		this.name = cuisineName;
		this.complete = isCompete;
	}
}

export default Cuisine;
