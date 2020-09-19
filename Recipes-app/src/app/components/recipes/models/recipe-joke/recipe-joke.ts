export interface IRecipeJoke {
	text: string;
}

export class RecipeJoke implements IRecipeJoke {
	public text: string = '';

	constructor(recipeJoke: RecipeJoke) {
		this.text = recipeJoke.text;
	}

}

export default RecipeJoke;
