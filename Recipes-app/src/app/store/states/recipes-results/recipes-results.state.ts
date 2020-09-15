import { IRecipeWithDetails } from 'src/app/components/recipes/models/recipe-with-details/recipe-with-details';
import { IRecipe } from 'src/app/components/recipes/models/recipe/recipe';

export interface IRecipesResults {
	recipes: IRecipe[];
	recipesWithDetails: IRecipeWithDetails;
	isRandomExist?: boolean;
	isLoading?: boolean;
	isNothingFound?: boolean;
	loadError?: boolean;
}

export const initialRecipesResultsState: IRecipesResults = {
	recipes: [],
	recipesWithDetails: null,
	isRandomExist: false,
	isLoading: false,
	isNothingFound: false,
	loadError: false,
};
