import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { RecipeWithDetails } from '../../models/recipe-with-details/recipe-with-details';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
	selector: 'app-recipe-with-details-card',
	templateUrl: './recipe-with-details-card.component.html',
	styleUrls: ['./recipe-with-details-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeWithDetailsCardComponent implements OnInit, OnDestroy {

	public isLinear = false;
	public formGroup: FormGroup;
	public form: FormArray;



	@Input()
	public recipeWithDetails: RecipeWithDetails;

	// tslint:disable-next-line: no-empty
	constructor(public recipesService: RecipesService, private _formBuilder: FormBuilder) { }

	init() {
		return this._formBuilder.group({
			cont: new FormControl('', [Validators.required]),
		})
	}

	addItem() {
		this.form = this.formGroup.get('form') as FormArray;
		this.form.push(this.init());
	}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
		// this.recipesService.checkRecipeDetails(this.recipeWithDetails.id);
		console.log('f');
		console.log(this.recipeWithDetails.id);
		this.formGroup = this._formBuilder.group({
			form: this._formBuilder.array(this.recipesService.recipeWithDetails.analyzedInstructions)
		});
	}

	public ngOnDestroy(): void {
		this.recipeWithDetails = null;
		console.log('fff');
	}



}
