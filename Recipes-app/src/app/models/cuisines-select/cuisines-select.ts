import Cuisine from '../cuisines/cuisines';

export interface ICuisinesSelect {
  cuisinesValuesStrings: string[];
	cuisinesValues: Cuisine[];
}

export class CuisinesSelect implements ICuisinesSelect {
  public cuisinesValues: Cuisine[] = [new Cuisine('', false)];
  public cuisinesValuesStrings: string [];

	constructor(cuisinesValuesStrings: string[]) {
		this.cuisinesValuesStrings = cuisinesValuesStrings;
	}
}

export default CuisinesSelect;
