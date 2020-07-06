import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { LatestComponent } from './components/latest/latest.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
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
		path: 'about',
		component: AboutComponent,
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
