import Cuisine from '../cuisines/cuisines';

export interface ICuisinesSelect {
  cuisinesValuesStrings: string[];
  cuisinesInclude: Cuisine[];
  cuisinesExclude: Cuisine[];
}

export class CuisinesSelect implements ICuisinesSelect {
  public cuisinesInclude: Cuisine[] = null;
  public cuisinesExclude: Cuisine[] = null;
  public cuisinesValuesStrings: string[];

	constructor(cuisinesValuesStrings: string[]) {
		this.cuisinesValuesStrings = cuisinesValuesStrings;
	}
}

export default CuisinesSelect;
