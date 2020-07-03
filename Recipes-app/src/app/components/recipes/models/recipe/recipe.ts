interface INutritionElement {
	title: string;
	amount: number;
	unit: string;
}

export interface IRecipe {
	id: number;
	image: string;
	imageType: string;
	nutrition: INutritionElement[];
	title: string;
}

export class Recipe implements IRecipe {
	public id: number = null;
	public imageType: string = 'jpg';
	public image: string = null;
	public nutrition: INutritionElement[] = [];
	public title: string = null;

	constructor(recipe: IRecipe) {
		this.id = recipe.id;
		this.imageType = recipe.imageType;
		this.nutrition = recipe.nutrition;
		this.image = `https://spoonacular.com/recipeImages/${this.id}-636x393.${this.imageType}`;
		this.title = recipe.title;
	}
}

export default Recipe;
