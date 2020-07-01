import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { LatestComponent } from './components/latest/latest.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'favourite',
		component: FavouriteComponent,
  },
  {
		path: 'latest',
		component: LatestComponent,
	},
	{
		path: 'recipe-details',
		component: RecipesComponent,
	},
	{
		path: 'recipe-details/:id',
		component: RecipesComponent,
	},
	{
		path: 'not-found',
		redirectTo: '**',
		pathMatch: 'full',
	},
	{
		path: '**',
		component: NotFoundPageComponent,
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
