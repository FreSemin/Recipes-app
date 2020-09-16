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

		case ERecipesResultsActions.RecipesResultsGetSearch:
			return {
				...state,
				isLoading: true
			};

		case ERecipesResultsActions.RecipesResultsGetSearchSucces:
			return {
				...state,
				recipes: action.payload,
				isLoading: false
			};

		case ERecipesResultsActions.RecipesResultsGetSearchNoResults:
			return {
				...state,
				isLoading: false,
				isNothingFound: true,
			};

		case ERecipesResultsActions.RecipesResultsGetRecipeWithDetails:
			return {
				...state,
				isLoading: true,
			};

		case ERecipesResultsActions.RecipesResultsGetRecipeWithDetailsInit:
			return {
				...state,
				isLoading: false,
				recipesWithDetails: action.payload,
			};

		case ERecipesResultsActions.RecipesResultsGetFavorite:
			return {
				...state,
				isLoading: true,
			};

		case ERecipesResultsActions.RecipesResultsGetFavoriteSucces:
			return {
				...state,
				recipes: action.payload,
				isLoading: false,
			};

		case ERecipesResultsActions.RecipesResultsClear:
			return {
				...state,
				recipes: [],
				recipesWithDetails: null,
				isRandomExist: false,
				isNothingFound: false,
			};

		case ERecipesResultsActions.RecipesResultsLoadError:
			return {
				...state,
				isLoading: false,
				loadError: true,
			};

		default:
			return state;

	}
}
