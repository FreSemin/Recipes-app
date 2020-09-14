import { IRecipe } from 'src/app/components/recipes/models/recipe/recipe';

export interface IRecipesResults {
	recipes: IRecipe[];
	isRandomExist?: boolean;
	isLoading?: boolean;
}

export const initialRecipesResultsState: IRecipesResults = {
	recipes: [],
	isRandomExist: false,
	isLoading: false,
};
