import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Firebase modules
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TriviaPageComponent } from './components/trivia-page/trivia-page.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

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

@NgModule({
  declarations: [
    AppComponent,
    TriviaPageComponent,
    UserDetailsComponent,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
