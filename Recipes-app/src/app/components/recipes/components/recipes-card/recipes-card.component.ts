import { Component, OnInit, Input } from '@angular/core';
import Recipe from '../../models/recipes';

@Component({
  selector: 'app-recipes-card',
  templateUrl: './recipes-card.component.html',
  styleUrls: ['./recipes-card.component.scss']
})
export class RecipesCardComponent implements OnInit {

  @Input()
  public recipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
