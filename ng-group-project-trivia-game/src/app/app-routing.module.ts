import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { LoginComponent } from './components/login/login.component';
import { TriviaPageComponent } from './components/trivia-page/trivia-page.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'create-game', component: CreateGameComponent },
  {path: 'trivia-page', component: TriviaPageComponent},
  { path: 'user-details', component: UserDetailsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}