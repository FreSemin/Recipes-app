import { CustomRecipesResultsAction, ERecipesResultsActions } from '../../action/recipes-results/recipes-results.actions';
import { initialRecipesResultsState, IRecipesResults } from '../../states/recipes-results/recipes-results.state';

export function recipesResultsReducers(
	state: IRecipesResults = initialRecipesResultsState,
	action: CustomRecipesResultsAction,
): IRecipesResults {
	switch (action.type) {
		case ERecipesResultsActions.RecipesResultsGetRandom:
			return {
				...state,
				isLoading: true
			};

		case ERecipesResultsActions.RecipesResultsGetRandomSucces:
			return {
				...state,
				recipes: action.payload,
				isLoading: false,
				isRandomExist: true,
			};

		case ERecipesResultsActions.RecipesResultsDeleteRandom:
			return {
				...state,
				recipes: [],
				isRandomExist: false,
			};

		case ERecipesResultsActions.RecipesResultsClear:
			return {
				...state,
				recipes: [],
				isRandomExist: false,
			};

		case ERecipesResultsActions.RecipesResultsLoadError:
			return {
				...state,
				isLoading: false,
			};

		default:
			return state;

	}
}
