interface IRecipe {
	id: number;
	image: string;
	readyInMinutes: number;
	servings: number;
	sourceUrl: string;
	title: string;
}

export class Recipe implements IRecipe {
	public id: number = null;
	public image: string = null;
	public readyInMinutes: number = null;
	public servings: number = null;
	public sourceUrl: string = null;
	public title: string = null;

	constructor(recipe: IRecipe) {
		this.id = recipe.id;
		// this.image = `https://www.google.com/${recipe.image}`;
		this.image = recipe.image;
		this.readyInMinutes = recipe.readyInMinutes;
		this.servings = recipe.servings;
		this.sourceUrl = recipe.sourceUrl;
		this.title = recipe.title;
	}
}

export default Recipe;
