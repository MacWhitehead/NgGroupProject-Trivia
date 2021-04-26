import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { CreateGameComponent } from './create-game/create-game.component';

const routes: Routes = [
  {path: "user-details", component: UserDetailsComponent},
  {path: 'create-game', component: CreateGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
