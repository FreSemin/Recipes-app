import {
	Component,
	OnInit,
	Input,
	OnDestroy,
	ChangeDetectionStrategy,
} from '@angular/core';
import { RecipeWithDetails } from '../../models/recipe-with-details/recipe-with-details';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
// import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
	FormArray,
} from '@angular/forms';

@Component({
	selector: 'app-recipe-with-details-card',
	templateUrl: './recipe-with-details-card.component.html',
	styleUrls: ['./recipe-with-details-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeWithDetailsCardComponent implements OnInit, OnDestroy {
	// public isLinear: boolean = false;
	// public formGroup: FormGroup;
	// public form: FormArray;

	isLinear = false;
  firstFormGroup: FormGroup;
	// secondFormGroup: FormGroup;
	

	@Input()
	public recipeWithDetails: RecipeWithDetails;

	// tslint:disable-next-line: no-empty
	constructor(
		public recipesService: RecipesService,
		private _formBuilder: FormBuilder
	) {}



	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
		// this.recipesService.checkRecipeDetails(this.recipeWithDetails.id);
		console.log(this.recipeWithDetails.id);
		console.log('f');

		// this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
	}

	public ngOnDestroy(): void {
		this.recipeWithDetails = null;
	}
}
