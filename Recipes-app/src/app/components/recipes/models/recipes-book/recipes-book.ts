import { Recipe } from '../recipe/recipe';

interface IRecipeBook {
	number: number;
	results: Recipe[];
	totalResults: number;
}

export class RecipeBook implements IRecipeBook {
	public number: number = null;
	public results: Recipe[];
	public totalResults: number = null;

	constructor(recipeBook: RecipeBook) {
		this.number = recipeBook.number;
		this.results = recipeBook.results;
		this.totalResults = recipeBook.totalResults;
	}

}

export default Recipe;
