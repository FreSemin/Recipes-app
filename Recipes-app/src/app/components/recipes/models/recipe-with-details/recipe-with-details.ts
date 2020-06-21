import { IRecipe } from '../recipe/recipe';

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
  vegetarian: boolean; // 1
  vegan: boolean; // 1
  glutenFree: boolean; // 1
  veryHealthy: boolean; // 1
  weightWatcherSmartPoints: number; // 1
  preparationMinutes: number; // 1
  cookingMinutes: number;   // 1
  aggregateLikes: number; // 1
  spoonacularScore: number; // 1
  healthScore: number; // 1
  pricePerServing: number; // 1
  summary: string; // review
  cuisines: any[];  // kitchens ??? //1
  dishTypes: string[]; // 1
  diets: any[];    // ??? //1
  occasions: string[]; // when we can cook it //1
  winePairing: WinePairing; // with Wine?  are you adult?
  instructions: string;  // all instruction   // 2
  analyzedInstructions: AnalyzedInstruction[];  // instruction with steps  //1
}

export class RecipeWithDetails implements IRecipeWithDetails {
  public id: number = null;
  public image: string = null;  // 1
  public readyInMinutes: number = null; // 1
  public servings: number = null; // 1
  public sourceUrl: string = null;
  public title: string = null; // 1

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
  public cuisines: any[] = null;  // kitchens ???
  public dishTypes: string[] = null;
  public diets: any[] = null;    // ???
  public occasions: string[] = null; // when we can cook it
  public winePairing: WinePairing = null; // with Wine?  are you adult?
  public instructions: string = null;  // all instruction
  public analyzedInstructions: AnalyzedInstruction[] = null;  // instruction with steps

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
  }
}

export default RecipeWithDetails;
