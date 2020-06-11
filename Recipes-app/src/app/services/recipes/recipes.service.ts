import { Injectable } from '@angular/core';
import { Recipe } from '../../components/recipes/models/recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  public recipesResultArr: Recipe[] = [];

  public recipesResult: Recipe[] = [{
		name: 'some',
		age: 123,
	},
	{
		name: 'name2',
		age: 333
  }];

  constructor() {}

  public showList(): void {
	this.recipesResultArr = this.recipesResult;
  }
}
