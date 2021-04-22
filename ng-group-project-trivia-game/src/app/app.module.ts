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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './page1/page1.module';

// Service
import { AuthService } from './page1/auth.service'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginModule,
    AngularFireModule.initializeApp(environment.firebase, 'ng-group-project-trivia'),
    AngularFirestoreModule,     // Only required for database features
    AngularFireAuthModule,     // Only required for auth features,
    AngularFireStorageModule   // Only required for storage features
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
