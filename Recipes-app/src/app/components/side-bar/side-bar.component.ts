import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes/recipes.service';

@Component({
	selector: 'app-side-bar',
	templateUrl: './side-bar.component.html',
	styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

	constructor(public recipesService: RecipesService) { }

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
	}

}
