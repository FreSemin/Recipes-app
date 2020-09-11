import RecipeJoke, { IRecipeJoke } from 'src/app/components/recipes/models/recipe-joke/recipe-joke';
import { initialRecipeJokeState } from '../../states/recipe-joke/recipe-joke.state';
import { ERecipeJokeActions, CustomActions } from '../../action/recipe-joke/recipe-joke.actions';

export function recipeJokeReducer(state: IRecipeJoke = initialRecipeJokeState, action: CustomActions): RecipeJoke {
	switch (action.type) {
		case ERecipeJokeActions.RecipeJokeGetSucces:
			return {
				...state,
				text: action.payload,
			};

		default:
			return state;
	}
}

