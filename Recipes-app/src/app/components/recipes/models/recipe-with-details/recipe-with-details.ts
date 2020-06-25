import { IRecipe } from '../recipe/recipe';



interface ExtendedIngredient {
	id: number;
	image: string;
	amount: number; // price
	name: string;
}

interface WinePairing {
	pairedWines: string[];
	pairingText: string;
}

interface Step {
	number: number;
	step: string;
}

interface AnalyzedInstruction {
	name: string;
	steps: Step[];
}

interface IRecipeWithDetails extends IRecipe {
	vegetarian: boolean;
	vegan: boolean;
	glutenFree: boolean;
	veryHealthy: boolean;
	weightWatcherSmartPoints: number;
	preparationMinutes: number;
	cookingMinutes: number;
	aggregateLikes: number;
	spoonacularScore: number;
	healthScore: number;
	pricePerServing: number;
	summary: string;
	cuisines: any[];
	dishTypes: string[];
	diets: any[];
	occasions: string[];
	winePairing: WinePairing;
	instructions: string;
	analyzedInstructions: AnalyzedInstruction[];
	extendedIngredients: ExtendedIngredient[];
}

export class RecipeWithDetails implements IRecipeWithDetails {
	public id: number = null;
	public image: string = null;
	public readyInMinutes: number = null;
	public servings: number = null;
	public sourceUrl: string = null;
	public title: string = null;

	public vegetarian: boolean = null;
	public vegan: boolean = null;
	public glutenFree: boolean = null;
	public veryHealthy: boolean = null;
	public weightWatcherSmartPoints: number = null;
	public preparationMinutes: number = null;
	public cookingMinutes: number = null;
	public aggregateLikes: number = null;
	public spoonacularScore: number = null;
	public healthScore: number = null;
	public pricePerServing: number = null;
	public summary: string = null;
	public cuisines: any[] = null;
	public dishTypes: string[] = null;
	public diets: any[] = null;
	public occasions: string[] = null;
	public winePairing: WinePairing = null;
	public instructions: string = null;
	public analyzedInstructions: AnalyzedInstruction[] = null;
	public extendedIngredients: ExtendedIngredient[] = null;

	constructor(recipeWithDetails: IRecipeWithDetails) {
		this.id = recipeWithDetails.id;
		this.image = `https://spoonacular.com/recipeImages/${this.id}-636x393.jpg`;
		this.readyInMinutes = recipeWithDetails.readyInMinutes;
		this.servings = recipeWithDetails.servings;
		this.sourceUrl = recipeWithDetails.sourceUrl;
		this.title = recipeWithDetails.title;

		this.vegetarian = recipeWithDetails.vegetarian;
		this.vegan = recipeWithDetails.vegan;
		this.glutenFree = recipeWithDetails.glutenFree;
		this.veryHealthy = recipeWithDetails.veryHealthy;
		this.weightWatcherSmartPoints = recipeWithDetails.weightWatcherSmartPoints;
		this.preparationMinutes = recipeWithDetails.preparationMinutes;
		this.cookingMinutes = recipeWithDetails.cookingMinutes;
		this.aggregateLikes = recipeWithDetails.aggregateLikes;
		this.spoonacularScore = recipeWithDetails.spoonacularScore;
		this.healthScore = recipeWithDetails.healthScore;
		this.pricePerServing = recipeWithDetails.pricePerServing;
		this.summary = recipeWithDetails.summary;
		this.cuisines = recipeWithDetails.cuisines;
		this.dishTypes = recipeWithDetails.dishTypes;
		this.diets = recipeWithDetails.diets;
		this.occasions = recipeWithDetails.occasions;
		this.winePairing = recipeWithDetails.winePairing;
		this.instructions = recipeWithDetails.instructions;
		this.analyzedInstructions = recipeWithDetails.analyzedInstructions;

		this.extendedIngredients = this.updateIngridientsImages(recipeWithDetails.extendedIngredients);
	}

	public updateIngridientsImages(ingridients: ExtendedIngredient[]): ExtendedIngredient[] {
		const defaultImageSize: string = '100x100';
		ingridients.forEach((ingridient: ExtendedIngredient) => {
			ingridient.image = `https://spoonacular.com/cdn/ingredients_${defaultImageSize}/${ingridient.image}`;
		});
		return ingridients;
	}
}

export default RecipeWithDetails;
