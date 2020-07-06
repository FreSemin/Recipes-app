import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SearchHeaderComponent } from './components/search-header/search-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipesCardComponent } from './components/recipes/components/recipes-card/recipes-card.component';
import { RecipesService } from './services/recipes/recipes.service';
import { HomeComponent } from './components/home/home.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { RecipesDataService } from './services/recipes-data/recipes-data.service';
import { RecipeWithDetailsCardComponent } from './components/recipes/components/recipe-with-details-card/recipe-with-details-card.component';
import { MaterialModule } from './modules/material-modules/meterial.module';
import { PaginationComponent } from './components/paginator/paginator.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { LatestComponent } from './components/latest/latest.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
	declarations: [
		AppComponent,
		SearchHeaderComponent,
		SideBarComponent,
		RecipesComponent,
		RecipesCardComponent,
		HomeComponent,
		PaginationComponent,
		FavouriteComponent,
		RecipeWithDetailsCardComponent,
		NotFoundPageComponent,
		AboutComponent,
		LatestComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		MaterialModule,
		BrowserAnimationsModule,
		AppRoutingModule,
	],
	providers: [RecipesService, RecipesDataService],
	bootstrap: [AppComponent]
})
export class AppModule { }
