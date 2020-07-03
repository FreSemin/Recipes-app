import Recipe from '../recipe/recipe';

export interface IRecipeRandom {
	recipes: Recipe[];
}

export class RecipesRandom implements IRecipeRandom {
	public recipes: Recipe[];

	constructor(recipesRandom: Recipe[]) {
		this.recipes = recipesRandom;
	}
}

export default RecipesRandom;
