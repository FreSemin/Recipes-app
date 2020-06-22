import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { RecipesComponent } from './components/recipes/recipes.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'favourite',
		component: FavouriteComponent,
	},
	{
		path: 'recipe-details',
		component: RecipesComponent,
	},
	{
		path: 'recipe-details/:id',
		component: RecipesComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
