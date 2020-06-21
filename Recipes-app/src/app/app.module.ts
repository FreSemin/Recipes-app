import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
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

@NgModule({
	declarations: [
		AppComponent,
		SearchHeaderComponent,
		SideBarComponent,
		RecipesComponent,
		RecipesCardComponent,
		HomeComponent,
		FavouriteComponent,
		RecipeWithDetailsCardComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		BrowserAnimationsModule,
		AppRoutingModule,
	],
	providers: [RecipesService, RecipesDataService],
	bootstrap: [AppComponent]
})
export class AppModule { }
