interface IRecipe {
  name: string;
  age: number;
}

export class Recipe implements IRecipe {
  public name: string = null;
  public age: number = null;

  constructor( recipe: IRecipe ) {
	this.name = recipe.name;
	this.age = recipe.age;
  }
}

export default Recipe;
