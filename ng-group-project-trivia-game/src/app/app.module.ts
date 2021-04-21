import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TriviaPageComponent } from './components/trivia-page/trivia-page.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
<<<<<<< HEAD

//Mats
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
=======
>>>>>>> 6c751c693aeb40559c0406ff6b96b5ca16916851

@NgModule({
  declarations: [
    AppComponent,
    TriviaPageComponent,
<<<<<<< HEAD
    UserDetailsComponent,
=======
    UserDetailsComponent
>>>>>>> 6c751c693aeb40559c0406ff6b96b5ca16916851
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatRadioModule, 
    MatProgressSpinnerModule, 
    MatGridListModule, 
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
