interface INutritientElement {
	title: string;
	amount: number;
	unit: string;
}

interface INutritientsElements {
	nutrients: INutritientElement[];
}

export interface IRecipe {
	id: number;
	image: string;
	imageType: string;
	nutrition: INutritientsElements;
	title: string;
}

export class Recipe implements IRecipe {
	public id: number = null;
	public imageType: string = 'jpg';
	public image: string = null;
	public nutrition: INutritientsElements = null;
	public title: string = null;

	constructor(recipe: IRecipe) {
		this.id = recipe.id;
		this.imageType = recipe.imageType;

		if (Boolean(this.nutrition)) {
			this.nutrition = recipe.nutrition;
		}

		this.image = `https://spoonacular.com/recipeImages/${this.id}-636x393.${this.imageType}`;
		this.title = recipe.title;
	}
}

export default Recipe;
