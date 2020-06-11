import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchHeaderComponent } from './components/search-header/search-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipesCardComponent } from './components/recipes/components/recipes-card/recipes-card.component';

@NgModule({
  declarations: [
	AppComponent,
	SearchHeaderComponent,
	SideBarComponent,
	RecipesComponent,
	RecipesCardComponent
  ],
  imports: [
  BrowserModule,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  AppRoutingModule,
  BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
